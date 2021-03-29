import React from 'react';

import './Order.scss';

const Order = (props) => {
  const ingredients = [];

  for (let name in props.ingredients) {
    ingredients.push({
      name: name,
      amount: props.ingredients[name]
    });
  }

  return (
    <div className="order">
      <p>Ingredients: {ingredients.map(ingredient => (
        <span className="ingredient" key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
      ))}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;
