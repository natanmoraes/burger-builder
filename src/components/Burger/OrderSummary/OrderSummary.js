import React from 'react'
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
      <p>Continue to checkout?</p>
    </div>
  )
}

export default OrderSummary
