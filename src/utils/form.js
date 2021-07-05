import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import { Types } from './types';
import {DatePicker} from 'react-rainbow-components';

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
          if (props.multi) {
            resolver = yup.array().of(yup.string())
          }

          if (required) {
            resolver = resolver.required(required.message)
          }
          if (url) {
            resolver = resolver.url(url.message)
          }
          return { ...resolvers, [key]: resolver }
        case Types.number:
          resolver = yup.number()
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

  const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm({
    resolver: yupResolver(buildResolver(schema))
  });

  console.debug(watch())

  return (
    <form className="col-12 section pt-2 pr-2" onSubmit={handleSubmit(onChange)}>
      {flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors} register={register} schema={schema} control={control} />)}
      <div className="d-flex flex-row justify-content-end">
        <button className="btn btn-danger" type="button" onClick={() => reset()}>Annuler</button>
        <button className="btn btn-success ml-1" type="submit">Sauvegarder</button>
      </div>
    </form>
  )
}

const Step = ({ entry, step, errors, register, schema, control }) => {
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
              <label htmlFor="title">{entry}</label>
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
        case 'markdown': //
        case 'select':
          return (
            <Controller
              name={entry}
              control={control}
              defaultValue={!!step.defaultValue}
              render={({ field }) => {
                return (
                  <div className="form-group">
                    <label htmlFor="title">{step.label}</label>
                    <SelectInput
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
            <div className="form-group">
              <label htmlFor="title">{entry}</label>
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
      return (
        <div className="form-group">
          <label htmlFor="title">{entry}</label>
          <input
            type="number" id={entry}
            className={classNames("form-control", { 'is-invalid': errors[entry] })}
            name={entry}
            placeholder={step.placeholder}
            {...register(entry)} />
          {errors[entry] && <div className="invalid-feedback">{errors[entry].message}</div>}
        </div>
      );
    case Types.bool:
      return (
        <Controller
          name={entry}
          control={control}
          defaultValue={!!step.defaultValue}
          render={({ field }) => {
            return (
              <div className="form-group">
                <label htmlFor="title">{step.label}</label>
                <BooleanInput
                  onChange={field.onChange}
                  value={field.value}
                />
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
                    <label htmlFor="title">{step.label}</label>
                    <SelectInput
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
                <label htmlFor="title">{step.label}</label>
                <DatePicker
                  id="datePicker-1"
                  value={field.value}
                  onChange={field.onChange}
                  label="DatePicker Label"
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