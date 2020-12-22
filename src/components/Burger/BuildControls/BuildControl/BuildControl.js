import React from 'react';
import './BuildControl.scss';

const BuildControl = (props) => {
  return (
    <div className="build-control">
      <div className="label">{props.label}</div>
      <button className="less" onClick={props.removeIngredient} disabled={props.disableRemoveButton}>Less</button>
      <button className="more" onClick={props.addIngredient}>More</button>
    </div>
  );
}

export default BuildControl;