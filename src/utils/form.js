import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import { Types } from './types';
import { DatePicker } from 'react-rainbow-components';

import { BooleanInput, Collapse, SelectInput } from './inputs';

import { StringResolver, NumberResolver, ObjectResolver, DateResolver, BooleanResolver, ArrayResolver } from './resolvers';

const buildSubResolver = (props) => {
  let resolver;
  const { type, constraints = {} } = props;
  if (props.format === 'array' || props.multi) {
    let subResolver = props.schema && buildSubResolver(props.schema)
    //todo: gerer les 2 cas array de primitives ou object array
    console.debug({ props, subResolver })
    resolver = new ArrayResolver(constraints).toResolver(subResolver);
  } else {
    switch (type) {
      case Types.string:
        resolver = new StringResolver(constraints).toResolver();
        break;
      case Types.number:
        resolver = new NumberResolver(constraints).toResolver();
        break;
      case Types.bool:
        resolver = new BooleanResolver(constraints).toResolver();
        break;
      case Types.object:
        resolver = new ObjectResolver(constraints).toResolver();
        break;
      case Types.date:
        resolver = new DateResolver(constraints).toResolver();
        break;
      default:
        break;
    }
  }
  return resolver
}


const buildResolver = (schema) => {
  const dependencies = [];
  const shape = Object.entries(schema)
    .reduce((resolvers, [key, props]) => {
      const resolver = buildSubResolver(props);
      return { ...resolvers, [key]: resolver }
    }, {})
  console.debug({ shape })
  return yup.object().shape(shape, dependencies);
}

export const Form = ({ schema, flow, value, onChange }) => {

  const { register, handleSubmit, formState: { errors }, control, reset, watch, trigger, getValues, setValue } = useForm({
    resolver: yupResolver(buildResolver(schema))
  });

  // console.debug(watch())

  return (
    <form className="col-12 section pt-2 pr-2" onSubmit={handleSubmit(onChange)}>
      {flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors}
        register={register} schema={schema} control={control} trigger={trigger} getValues={getValues} setValue={setValue} />)}
      <div className="d-flex flex-row justify-content-end">
        <button className="btn btn-danger" type="button" onClick={() => reset()}>Annuler</button>
        <button className="btn btn-success ml-1" type="submit">Sauvegarder</button>
      </div>
    </form>
  )
}

const Step = ({ entry, step, errors, register, schema, control, trigger, getValues, setValue }) => {


  if (entry && typeof entry === 'object') {
    const errored = entry.flow.some(step => !!errors[step])
    return (
      <Collapse label={entry.label} collapsed={entry.collapsed} errored={errored}>
        {entry.flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors} register={register} />)}
      </Collapse>
    )
  }

  switch (step.type) {
    case Types.string:
      switch (step.format) {
        case 'text':
          return (
            <div className="form-group">
              <label className="form-label" htmlFor={entry}>{entry}</label>
              <textarea
                type="text" id={entry}
                className={classNames("form-control", { 'is-invalid': errors[entry] })}
                name={entry}
                placeholder={step.placeholder}
                {...register(entry)}
                {...step.props} />
              {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
            </div>
          );
        case 'code': //todo
        case 'markdown': //todo
        case 'array':
          return (
            <ArrayStep
              entry={entry} step={step} trigger={trigger}
              register={register} control={control} errors={errors}
              setValue={setValue} values={getValues(entry)} defaultValue={""} //todo: real defaultValue
              component={((props, idx) => {
                return (
                  <>
                    <input
                      type="text"
                      className={classNames("form-control", { 'is-invalid': errors[entry] && errors[entry][idx] })}
                      placeholder={step.placeholder} {...props} />
                    {errors[entry] && errors[entry][idx] && <div className="invalid-feedback">{errors[entry][idx].message}</div>}
                  </>
                )
              })} />
          )
        case 'select':
          return (
            <Controller
              name={entry}
              control={control}
              defaultValue={!!step.defaultValue}
              render={({ field }) => {
                return (
                  <div className="mb-3">
                    <label className="form-label" htmlFor={entry}>{step.label}</label>
                    <SelectInput
                      className={classNames('test555555555555', { 'is-invalid': errors[entry] })}
                      onChange={field.onChange}
                      value={field.value}
                      possibleValues={step.options}
                      {...step}
                    //todo: faut que fetch soit entiereemnt remplacable
                    />
                    {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
                  </div>
                )
              }}
            />
          )
        default:
          return (
            <div className="mb-3">
              <label className="form-label" htmlFor={entry}>{entry}</label>
              <input
                type="text" id={entry}
                className={classNames("form-control", { 'is-invalid': errors[entry] })}
                name={entry}
                placeholder={step.placeholder}
                {...register(entry)} />
              {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
            </div>
          );
      }

    case Types.number:
      switch (step.format) {
        case 'array':
          return (
            <ArrayStep
              entry={entry} step={step} trigger={trigger}
              register={register} control={control} errors={errors}
              values={getValues(entry)} defaultValue={0} //todo: real default value
              component={(props => {
                return (
                  <input
                    type="number"
                    className={classNames("form-control", { 'is-invalid': errors[entry] })}
                    placeholder={step.placeholder} {...props} />
                )
              })} />
          )

        default:
          return (
            <div className="form-group">
              <label className="form-label" htmlFor={entry}>{entry}</label>
              <input
                type="number" id={entry}
                className={classNames("form-control", { 'is-invalid': errors[entry] })}
                name={entry}
                placeholder={step.placeholder}
                {...register(entry)} />
              {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
            </div>
          );
      }

    case Types.bool:
      return (
        <Controller
          name={entry}
          control={control}
          defaultValue={!!step.defaultValue}
          render={({ field }) => {
            return (
              <div className="form-group">
                <label className="form-label" htmlFor={entry}>{step.label}</label>
                <BooleanInput
                  className={classNames({ 'is-invalid': errors[entry] })}
                  onChange={field.onChange}
                  value={field.value}
                />
                {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
              </div>
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
                  <div className="form-group">
                    <label className="form-label" htmlFor={entry}>{step.label}</label>
                    <SelectInput
                      className={classNames({ 'is-invalid': errors[entry] })}
                      onChange={field.onChange}
                      value={field.value}
                      possibleValues={step.options}
                      {...step}
                    //todo: faut que fetch soit entiereemnt remplacable
                    />
                    {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
                  </div>
                )
              }}
            />
          )
        default:
          return null;
      }
    case Types.date:
      return (
        <Controller
          name={entry}
          control={control}
          defaultValue={step.defaultValue}
          render={({ field }) => {

            return (
              <div className="form-group">
                <label className="form-label" htmlFor={entry}>{step.label}</label>
                <DatePicker
                  id="datePicker-1"
                  className={classNames({ 'is-invalid': errors[entry] })}
                  value={field.value}
                  onChange={field.onChange}
                  formatStyle="large"
                // locale={state.locale.name}
                />
                {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
              </div>
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
    <div className="form-group">
      <label htmlFor={entry}>{step.label}</label>
      {fields
        .map((field, idx) => {
          return (
            <div key={field.id} className="d-flex flex-row">
              {component({ key: field.id, ...register(`${entry}.${idx}`), ...field }, idx)}
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
    </div>
  )
}