import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

const Modal = (props) => {
  let classes = ["modal"];

  if (!props.show) {
    classes.push("hidden");
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} onClick={props.onModalClose} />
      <div className={classes.join(' ')}>{props.children}</div>
    </React.Fragment>
  );
}

export default Modal;