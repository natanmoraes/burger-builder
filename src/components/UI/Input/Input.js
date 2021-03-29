import React from 'react';
import './Input.scss';

const Input = (props) => {
  let element = null;

  switch (props.type) {
      case ('input'):
        element = <input {...props} />;
        break;
      case ('textarea'):
        element = <textarea {...props} />;
        break;
      default:
        element = <input {...props} />;
  }

  return (
    <div className="input">
        <label>{props.label}</label>
        {element}
    </div>
  );
};

export default Input;
