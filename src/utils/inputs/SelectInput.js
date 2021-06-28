import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Option } from '../Option';

const valueToSelectOption = (value) => {
  if (value === null) {
    return null;
  }
  return {
    label: value.label || value,
    value: value.value || value,
  };
};

export const SelectInput = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(Option(props.possibleValues)
    .map((maybeValues) => maybeValues.find((v) => v.value === props.value))
    .getOrElse(valueToSelectOption(props.value)))
  const [values, setValues] = useState((props.possibleValues || []).map(valueToSelectOption))


  const onChange = (e) => {
    setValue(e)
    props.onChange(e.value);
  };

  return (
    <div className="form-group row">
      <div className="col-sm-10">
        <div style={{ width: '100%' }} className="input-select">
          <Select
            name={`${props.label}-search`}
            isLoading={loading}
            value={value}
            isDisabled={props.disabled}
            placeholder={props.placeholder}
            options={values}
            onChange={onChange}
            classNamePrefix="reactSelect"
            className="reactSelect"
          />
        </div>
      </div>
    </div>
  )

}
