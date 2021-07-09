import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import { Types } from './types';
import { DatePicker } from 'react-rainbow-components';

import { BooleanInput, Collapse, SelectInput } from './inputs';


const buildResolver = (schema) => {
  const dependencies = [];
  const shape = Object.entries(schema)
    .reduce((resolvers, [key, props]) => {
      const { type, constraints: { required, url, min, max, integer, positive, negative, lessThan, moreThan, test, length } = {} } = props;
      let resolver;
      switch (type) {
        case Types.string:
          resolver = yup.string()
          //todo: if option && multi ...
          if (props.multi || props.format === 'array') {
            resolver = yup.array().of(yup.string()).ensure()
          }

          if (required) {
            resolver = resolver.required(required.message)
          }
          if (url) {
            resolver = resolver.url(url.message)
          }
          if (length) {
            resolver = resolver.length(length.value, length.message)
          }
          return { ...resolvers, [key]: resolver }
        case Types.number:
          resolver = yup.number()
          if (props.multi || props.format === 'array') {
            resolver = yup.array().of(yup.number()).ensure()
          }
          //todo: if option && multi ...
          if (required) {
            resolver = resolver.required(required.message)
          }
          if (integer) {
            resolver = resolver.integer(integer.message)
          }
          if (positive) {
            resolver = resolver.positive(positive.message)
          }
          if (negative) {
            resolver = resolver.negative(negative.message)
          }
          if (min) {
            resolver = resolver.min(min.value, min.message)
          }
          if (max) {
            resolver = resolver.max(max.value, max.message)
          }
          if (moreThan) {
            resolver = resolver.moreThan(moreThan.ref, moreThan.message)
            dependencies.push([key, moreThan.ref])
          }
          if (lessThan) {
            resolver = resolver.lessThan(lessThan.ref, lessThan.message)
            dependencies.push([key, lessThan.ref])
          }
          return { ...resolvers, [key]: resolver }
        case Types.object:
          resolver = yup.object();
          if (props.isMulti) {
            resolver = yup.array().ensure();
          }
          if (required) {
            resolver = resolver.required(required.message)
          }
          if (test) {
            resolver = resolver.test(test.name, test.message, test.test)
          }
          if (length) {
            resolver = resolver.length(length.value, length.message)
          }
          return { ...resolvers, [key]: resolver }
        case Types.date:
          resolver = yup.date();
          if (required) {
            resolver = resolver.required(required.message)
          }
          if (min) {
            resolver = resolver.min(min.value, min.message)
          }
          if (max) {
            resolver = resolver.max(max.value, max.message)
          }
          return { ...resolvers, [key]: resolver }
        default: return resolvers;
      }
    }, {})
  return yup.object().shape(shape, dependencies);
}

export const Form = ({ schema, flow, value, onChange }) => {

  const { register, handleSubmit, formState: { errors }, control, reset, watch, trigger, getValues, setValue } = useForm({
    resolver: yupResolver(buildResolver(schema))
  });

  // console.debug(watch())
  console.debug(errors)

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
              component={(props => {
                return (
                  <input
                    type="text"
                    className={classNames("form-control", { 'is-invalid': errors[entry] })}
                    placeholder={step.placeholder} {...props} />
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

                console.debug({field, errors})
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
              {component({ key: field.id, ...register(`${entry}.${idx}`), ...field })}
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