import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import * as constraints from './constraints';

import { Collapse } from './Collapse';

//todo: export depuis un autre fichier
/**
 * string: simple text line as input
 * text:  big text input as textarea
 * number: number input (for int or whatever use resolver)
 */
export const Types = {
  string: "STRING",
  text: "TEXT",
  number: "NUMBER",
}

//todo: export methode group()


const buildResolver = (schema) => {
  const shape = Object.entries(schema)
    .reduce((resolvers, [key, props]) => {
      const { type, constraints : { required, min, max, integer, positive, negative } } = props;
      let resolver;
      switch (type) {
        case Types.string:
          resolver = yup.string()
          if (required) {
            resolver = resolver.required(required.error)
          }
          return { ...resolvers, [key]: resolver }
        case Types.number:
          //todo: less than + more than...
          resolver = yup.number()
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
          return { ...resolvers, [key]: resolver }
        default: return resolvers;
      }
    }, {})

  return yup.object().shape(shape);
}

export const Form = ({ schema, flow, value, onChange }) => {

  const { register, handleSubmit, trigger, formState: { errors }, control, setValue, reset } = useForm({
    resolver: yupResolver(buildResolver(schema))
  });


  const testSchema = buildResolver(schema)
  testSchema
    .validate({
      name: 'jimmy',
      age: 55,
    })
    .catch(err => console.debug({ err, message: err.message }));

  return (
    <form className="col-12 section pt-2 pr-2" onSubmit={handleSubmit(onChange)}>
      {flow.map((entry, idx) => <Step key={idx} entry={entry} step={schema[entry]} errors={errors} register={register} schema={schema} />)}
      <div className="d-flex flex-row justify-content-end">
        <button className="btn btn-danger" type="button" onClick={() => reset()}>Annuler</button>
        <button className="btn btn-success ml-1" type="submit">Sauvegarder</button>
      </div>
    </form>
  )
}

const Step = ({ entry, step, errors, register, schema }) => {
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
    default:
      return null;
  }

}