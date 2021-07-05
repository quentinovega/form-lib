import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { option } from '../Option';

const valueToSelectoption = (value) => {
  if (value === null) {
    return null;
  }
  return {
    label: value?.label || value,
    value: value?.value || value,
  };
};

export const SelectInput = (props) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(props.isMulti ? [] : undefined)
  const [values, setValues] = useState((props.possibleValues || []).map(valueToSelectoption))

  useEffect(() => {
    //todo: why reload after choose option
    //todo: nice to have a fucntion to replace our fetch
    if (props.optionsFrom) {
      const cond = option(props.fetchCondition).map(cond => cond()).getOrElse(true);

      if (cond) {
        setLoading(true);
        return fetch(props.optionsFrom, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
          .then((r) => r.json())
          .then((values) => values.map(props.transformer || valueToSelectoption))
          .then((values) => {
            setValues(values);
            setValue(values.find((item) => item.value === (value ? value.value : value)) || null);
            setLoading(false);
          });
      }
    }
  }, [props, value])


  const onChange = (changes) => {
    setValue(changes)
    if (props.isMulti) {
      props.onChange(changes.map(x => x.value))
    } else {
      props.onChange(changes.value);
    }
  };

  return (
    <div className="form-group row">
      <div className="col-sm-10">
        <div style={{ width: '100%' }} className="input-select">
          {props.createOption && (
            <CreatableSelect
              {...props}
              name={`${props.label}-search`}
              isLoading={loading}
              value={value}
              isDisabled={props.disabled}
              placeholder={props.placeholder}
              isClearable
              onChange={onChange}
              options={values}
              onCreateOption={option => props.onCreateOption ? props.onCreateOption(option) : undefined} //todo: default onCreateOption
              formatCreateLabel={(value) => props.formatCreateLabel ? props.formatCreateLabel(value) : `create ${value} ?`} //todo: default formatCreateLabel
              classNamePrefix="react-form-select"
              className="react-form-select"
            />
          )}
          {!props.createOption && (
            <Select
              {...props}
              name={`${props.label}-search`}
              isLoading={loading}
              value={value}
              isDisabled={props.disabled}
              placeholder={props.placeholder}
              options={values}
              onChange={onChange}
              classNamePrefix="react-form-select"
              className="react-form-select"
            />
          )}

        </div>
      </div>
    </div>
  )

}
