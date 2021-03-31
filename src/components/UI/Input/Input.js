import React from 'react';
import './Input.scss';

const Input = (props) => {
  let element = null;

  switch (props.type) {
    case ('input'):
      element = <input {...props.config} value={props.value} onChange={props.onChange} />;
      break;
    case ('textarea'):
      element = <textarea {...props.config} value={props.value} onChange={props.onChange} />;
      break;
    case ('select'):
      element = (
        <select value={props.value} onChange={props.onChange}>
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
      break;
    default:
      element = <input {...props.config} value={props.value} onChange={props.onChange} />;
  }

  return (
    <div className="input">
      <label>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
