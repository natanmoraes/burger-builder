import React from 'react';
import './Button.scss';

const Button = (props) => {
  let classes = ["button", props.type];

  return (
    <button
      className={classes.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
