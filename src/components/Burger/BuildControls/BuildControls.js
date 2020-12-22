import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.scss';

const controls = [
  { label: "Salad", type: "salad"},
  { label: "Bacon", type: "bacon"},
  { label: "Cheese", type: "cheese"},
  { label: "Meat", type: "meat"}
];

const BuildControls = (props) => {
  return (
    <div id="build-controls">
      {controls.map((control) => (
        <BuildControl 
          key={control.label} 
          label={control.label} 
          addIngredient={() => {props.addIngredient(control.type)}}
          removeIngredient={() => {props.removeIngredient(control.type)}}
          disableRemoveButton={props.disabledInfo[control.type]}
          />
      ))}
    </div>
  );
}

export default BuildControls;