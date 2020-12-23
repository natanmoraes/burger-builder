import React from 'react'
import Button from '../../UI/Button/Button';
import './OrderSummary.scss';

const OrderSummary = (props) => {
  const ingredientsSummary = Object
    .keys(props.ingredients)
    .map((ingredient) => {
      return <li key={ingredient}><span>{ingredient}</span>: {props.ingredients[ingredient]}</li>
    })
  return (
    <div className="order-summary">
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button type="danger" onClick={props.onPurchaseCancel}>Cancel</Button>
      <Button type="success" onClick={props.onPurchaseContinue}>Continue</Button>
    </div>
  )
}

export default OrderSummary
