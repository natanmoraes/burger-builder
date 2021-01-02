import React from 'react';
import './CheckoutSummary.scss';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className="checkout-summary">
      <h1>We hope it tastes well!</h1>
      <div className="burger-wrapper">
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button type="danger" onClick={props.onCancel}>CANCEL</Button>
      <Button type="success" onClick={props.onContinue}>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
