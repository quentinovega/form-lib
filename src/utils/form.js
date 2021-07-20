import React, { useEffect } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import { Types } from './types';
import { DatePicker } from 'react-rainbow-components';
import ReactToolTip from 'react-tooltip';
import { HelpCircle } from 'react-feather';
import { v4 as uuid } from 'uuid';

import { BooleanInput, Collapse, SelectInput, ObjectInput } from './inputs';

import { StringResolver, NumberResolver, ObjectResolver, DateResolver, BooleanResolver, ArrayResolver } from './resolvers';
import { option } from '../utils/Option'

export const buildSubResolver = (props, key, dependencies) => {
  let resolver;
  const { type, constraints = {} } = props;
  if (props.format === 'array' || props.isMulti) {
    let subResolver;

    if (props.schema && props.schema.type) {
      subResolver = buildSubResolver(props.schema, key, dependencies)
    } else if (props.schema) {
      subResolver = buildResolver(props.schema)
    }

    resolver = new ArrayResolver(constraints).toResolver(subResolver, key, dependencies);
  } else {
    switch (type) {
      case Types.string:
        resolver = new StringResolver(constraints).toResolver(key, dependencies);
        break;
      case Types.number:
        resolver = new NumberResolver(constraints).toResolver(key, dependencies);
        break;
      case Types.bool:
        resolver = new BooleanResolver(constraints).toResolver(key, dependencies);
        break;
      case Types.object:
        resolver = new ObjectResolver(constraints).toResolver(key, dependencies);
        break;
      case Types.date:
        resolver = new DateResolver(constraints).toResolver(key, dependencies);
        break;
      default:
        break;
    }
  }
  return resolver
}


const buildResolver = (schema, dependencies = []) => {
  const shape = Object.entries(schema)
    .reduce((resolvers, [key, props]) => {
      const resolver = buildSubResolver(props, key, dependencies);
      return { ...resolvers, [key]: resolver }
    }, {})
  return yup.object().shape(shape, dependencies);
}

const BasicWrapper = ({ entry, label, error, help, children, render }) => {
  const id = uuid();

  if (render) {
    return render({ entry, label, error, help, children })
  }


  return (
    <div className="form-group mt-3">
      <label className="form-label d-flex align-content-center" htmlFor={entry}>
        <span className="mr-2">{label}</span>
        {help && <>
          <ReactToolTip html={true} place={'bottom'} id={id} />
          <span data-html={true} data-tip={help} data-for={id}>
            <HelpCircle style={{ color: 'gray', width: 17, marginLeft: '.5rem', cursor: 'help' }} />
          </span>
        </>}
      </label>

      {children}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  )
}

const CustomizableInput = props => {
  if (props.render) {
    return (
      props.render({ ...props.field, error: props.error })
    )
  }
  return props.children
}

export const Form = ({ schema, flow, value, inputWrapper, onChange }) => {
  //todo: use flow for better defaultValue
  //todo: build recursively with subSchema
  const defaultValues = Object.entries(schema).reduce((acc, [key, entry]) => {
    if (typeof entry.defaultValue !== 'undefined' && entry.defaultValue !== null) {
      return { ...acc, [key]: entry.defaultValue }
    }
    let defaultValue = undefined;
    if (entry.type === Types.object) { defaultValue = {} }
    if (entry.format === 'array' || entry.isMulti) { defaultValue = [] }
    return { ...acc, [key]: defaultValue }
  }, {})

  const { register, handleSubmit, formState: { errors }, control, reset, watch, trigger, getValues, setValue } = useForm({
    resolver: yupResolver(buildResolver(schema)),
    defaultValues: value || defaultValues
  });

  useEffect(() => {
    if (flow && value) {
      reset(value)
    }
  }, [value, flow, reset])

  // console.debug(watch())

  return (
    <form className="col-12 section pt-2 pr-2" onSubmit={handleSubmit(onChange)}>
      {flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors}
        register={register} schema={schema} control={control} trigger={trigger} getValues={getValues}
        setValue={setValue} watch={watch} inputWrapper={inputWrapper} />)}
      <div className="d-flex flex-row justify-content-end">
        <button className="btn btn-danger" type="button" onClick={() => reset(defaultValues)}>Annuler</button>
        <button className="btn btn-success ml-1" type="submit">Sauvegarder</button>
      </div>
    </form>
  )
}

const Step = ({ entry, step, errors, register, schema, control, trigger, getValues, setValue, watch, inputWrapper }) => {

  if (entry && typeof entry === 'object') {
    const errored = entry.flow.some(step => !!errors[step])
    return (
      <Collapse label={entry.label} collapsed={entry.collapsed} errored={errored}>
        {entry.flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors}
          register={register} schema={schema} control={control} trigger={trigger} getValues={getValues}
          setValue={setValue} watch={watch} inputWrapper={inputWrapper} />)}
      </Collapse>
    )
  }

  const visibleStep = step && option(step.visible)
    .map(visible => {
      switch (typeof visible) {
        case 'object':
          const value = watch(step.visible.ref);
          return option(step.visible.test).map(test => test(value)).getOrElse(value)
        case 'boolean':
          return visible;
        default:
          return true;
      }
    })
    .getOrElse(true)
  if (!visibleStep) {
    return null;
  }

  switch (step.type) {
    case Types.string:
      switch (step.format) {
        case 'text':
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <CustomizableInput render={step.render} field={{ value: getValues(entry), onChange: v => setValue(entry, v) }} error={errors[entry]}>
                <textarea
                  type="text" id={entry}
                  className={classNames("form-control", { 'is-invalid': errors[entry] })}
                  disabled={step.disabled ? 'disabled' : null}
                  {...step.props}
                  name={entry}
                  placeholder={step.placeholder}
                  {...register(entry)} />
              </CustomizableInput>
            </BasicWrapper>
          );
        case 'code': //todo
        case 'markdown': //todo
        case 'array':
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <ArrayStep
                entry={entry} step={step} trigger={trigger}
                register={register} control={control} errors={errors}
                setValue={setValue} values={getValues(entry)}
                component={((props, idx) => {
                  return (
                    <CustomizableInput render={step.render} field={{ value: getValues(`${entry}.${idx}`), onChange: v => setValue(`${entry}.${idx}`, v, { shouldValidate: true }) }} error={errors[entry] && errors[entry][idx]}>
                      <>
                        <input
                          {...step.props}
                          type="text"
                          disabled={step.disabled ? 'disabled' : null}
                          className={classNames("form-control", { 'is-invalid': errors[entry] && errors[entry][idx] })}
                          placeholder={step.placeholder} {...props} />
                        {errors[entry] && errors[entry][idx] && <div className="invalid-feedback">{errors[entry][idx].message}</div>}
                      </>
                    </CustomizableInput>
                  )
                })} />
            </BasicWrapper>
          )
        case 'select':
          return (
            <Controller
              name={entry}
              control={control}
              render={({ field }) => {
                return (
                  <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
                    <CustomizableInput render={step.render} field={field} error={errors[entry]}>
                      <SelectInput
                        {...step.props}
                        className={classNames({ 'is-invalid': errors[entry] })}
                        disabled={step.disabled ? 'disabled' : null}
                        onChange={field.onChange}
                        value={field.value}
                        possibleValues={step.options}
                        {...step}
                      />
                    </CustomizableInput>
                  </BasicWrapper>
                )
              }}
            />
          )
        case 'password':
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <CustomizableInput render={step.render} field={{ value: getValues(entry), onChange: v => setValue(entry, v, { shouldValidate: true }) }} error={errors[entry]}>
                <input
                  {...step.props}
                  type="password" id={entry}
                  className={classNames("form-control", { 'is-invalid': errors[entry] })}
                  disabled={step.disabled ? 'disabled' : null}
                  name={entry}
                  placeholder={step.placeholder}
                  {...register(entry)} />
              </CustomizableInput>
            </BasicWrapper>
          );
        default:
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <CustomizableInput render={step.render} field={{ value: getValues(entry), onChange: v => setValue(entry, v, { shouldValidate: true }) }} error={errors[entry]}>
                <input
                  {...step.props}
                  type="text" id={entry}
                  className={classNames("form-control", { 'is-invalid': errors[entry] })}
                  disabled={step.disabled ? 'disabled' : null}
                  name={entry}
                  placeholder={step.placeholder}
                  {...register(entry)} />
              </CustomizableInput>
            </BasicWrapper>
          );
      }

    case Types.number:
      switch (step.format) {
        case 'array':
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <ArrayStep
                entry={entry} step={step} trigger={trigger}
                register={register} control={control} errors={errors}
                values={getValues(entry)}
                component={((props, idx) => {
                  return (
                    <CustomizableInput render={step.render} field={{ value: getValues(`${entry}.${idx}`), onChange: v => setValue(`${entry}.${idx}`, v, { shouldValidate: true }) }} error={errors[entry] && errors[entry][idx]}>
                      <>
                        <input
                          {...step.props}
                          type="number"
                          className={classNames("form-control", { 'is-invalid': errors[entry] && errors[entry][idx] })}
                          disabled={step.disabled ? 'disabled' : null}
                          placeholder={step.placeholder} {...props} />
                        {errors[entry] && errors[entry][idx] && <div className="invalid-feedback">{errors[entry][idx].message}</div>}
                      </>
                    </CustomizableInput>
                  )
                })} />
            </BasicWrapper>
          )

        default:
          return (
            <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
              <CustomizableInput render={step.render} field={{ value: getValues(entry), onChange: v => setValue(entry, v) }} error={errors[entry]}>
                <input
                  {...step.props}
                  type="number" id={entry}
                  className={classNames("form-control", { 'is-invalid': errors[entry] })}
                  disabled={step.disabled ? 'disabled' : null}
                  name={entry}
                  placeholder={step.placeholder}
                  {...register(entry)} />
              </CustomizableInput>
            </BasicWrapper>
          );
      }

    case Types.bool:
      return (
        <Controller
          name={entry}
          control={control}
          render={({ field }) => {
            return (
              <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
                <CustomizableInput render={step.render} field={field} error={errors[entry]}>
                  <BooleanInput
                    {...step.props}
                    className={classNames({ 'is-invalid': errors[entry] })}
                    disabled={step.disabled ? 'disabled' : null}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </CustomizableInput>
              </BasicWrapper>
            )
          }}
        />
      )

    case Types.object:
      switch (step.format) {
        case 'select':
          return (
            <Controller
              name={entry}
              control={control}
              defaultValue={step.defaultValue}
              render={({ field }) => {
                return (
                  <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
                    <CustomizableInput render={step.render} field={field} error={errors[entry]}>
                      <SelectInput
                        {...step.props}
                        className={classNames({ 'is-invalid': errors[entry] })}
                        disabled={step.disabled ? 'disabled' : null}
                        onChange={field.onChange}
                        value={field.value}
                        possibleValues={step.options}
                        {...step}
                      />
                    </CustomizableInput>
                  </BasicWrapper>
                )
              }}
            />
          )
        default:
          return (
            <Controller
              name={entry}
              control={control}
              defaultValue={step.defaultValue}
              render={({ field }) => {
                return (
                  <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
                    <CustomizableInput render={step.render} field={field} error={errors[entry]}>
                      <ObjectInput
                        {...step.props}
                        className={classNames({ 'is-invalid': errors[entry] })}
                        disabled={step.disabled ? 'disabled' : null}
                        onChange={field.onChange}
                        value={field.value}
                        possibleValues={step.options}
                        {...step}
                      />
                    </CustomizableInput>
                  </BasicWrapper>
                )
              }}
            />
          )
      }
    case Types.date:
      return (
        <Controller
          name={entry}
          control={control}
          defaultValue={step.defaultValue}
          render={({ field }) => {
            return (
              <BasicWrapper entry={entry} error={errors[entry]} label={entry} help={step.help} render={inputWrapper}>
                <CustomizableInput render={step.render} field={field} error={errors[entry]}>
                  <DatePicker
                    {...step.props}
                    id="datePicker-1"
                    className={classNames({ 'is-invalid': errors[entry] })}
                    disabled={step.disabled ? 'disabled' : null}
                    value={field.value}
                    onChange={field.onChange}
                    formatStyle="large"
                  // locale={state.locale.name}
                  />
                </CustomizableInput>
              </BasicWrapper>
            )
          }}
        />
      )
    default:
      return null;
  }

}


const ArrayStep = ({ entry, step, control, trigger, register, errors, component, values, defaultValue, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: entry, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  return (
    <>
      {fields
        .map((field, idx) => {
          return (
            <div key={field.id} className="d-flex flex-row">
              {component({ key: field.id, ...register(`${entry}.${idx}`), value: values[idx], ...field }, idx)}
              <div className="input-group-append">
                <button className="btn btn-danger btn-sm" onClick={() => {
                  remove(idx)
                  trigger("comments");
                }}>remove</button>
              </div>
            </div>
          )
        })}
      <div>
        <input type="button" className={classNames("btn btn-info mt-2", { 'is-invalid': errors[entry] })} onClick={() => {
          append(defaultValue)
          trigger(entry);
        }} value="Add" />
        {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
      </div>
    </>
  )
}