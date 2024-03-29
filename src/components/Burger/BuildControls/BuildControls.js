import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.scss';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = (props) => {
  return (
    <div className="build-controls">
      <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          addIngredient={() => { props.addIngredient(control.type) }}
          removeIngredient={() => { props.removeIngredient(control.type) }}
          disableRemoveButton={props.disabledInfo[control.type]}
        />
      ))}
      <button
        className="order-now"
        disabled={!props.purchasable}
        onClick={props.onPurchase}
      >
        Order Now!
      </button>
    </div>
  );
}

export default BuildControls;