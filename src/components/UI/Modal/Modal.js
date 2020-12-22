import React from 'react';
import './Modal.scss';

const Modal = (props) => {
  let classes = ["modal"];

  if (!props.show) {
    classes.push("hidden");
  }

  return (
    <div className={classes.join(' ')}>{props.children}</div>
  );
}

export default Modal;