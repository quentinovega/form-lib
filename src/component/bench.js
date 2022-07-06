import { useState } from 'react';
import { Form, format, type, constraints } from "@maif/react-forms";

import { bigSchema } from './bigshema';
import "@maif/react-forms/lib/index.css";

// const init = Array.from(Array(200).keys()).map((k) => `value-${k}`);

// const schema = init.reduce((acc, entry) => {
//   return { ...acc, [entry]: { type: type.string, placeholder: entry } };
// }, {});

const schema = {
  date: {
    type:type.date,
    defaultValue: new Date('11/03/1985')
  },
  dateTime: {
    type:type.date,
    format: format.datetime,
    defaultValue: new Date('11/03/1985')
  },
  time: {
    type:type.date,
    format: format.time,
    defaultValue: new Date()
  },
}

export const ReactForm = () => {
  const [value, setValue] = useState({});


  const onSubmit = (d) => {
    setValue(d)
  }

  return (
    <div style={{ margin: '50px 10px' }}>
      <pre>{JSON.stringify(value, null, 4)}</pre>
      {/* {value && <span>anniv :: {dateFormat(value.date, 'MMMM D YYYY')}</span>} */}
      <Form
        schema={schema}
        onSubmit={d => onSubmit(d)}
        flow={[{label: 'collapse', flow: ['date', 'datetime', 'time']}]}
        options={{
          // autosubmit: true,
          // actions: {
          //   reset: {display: true}
          // }
          // showErrorsOnStart: true
        }}
      // defaultValue={value}
      />
    </div>
  );
};
