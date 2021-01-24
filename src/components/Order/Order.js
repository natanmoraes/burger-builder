import React from 'react';

import './Order.scss';

const Order = (props) => {
  return (
    <div className="order">
      <p>Ingredients: Salad (1)</p>
      <p>Price: <strong>USD 1.99</strong></p>
    </div>
  );
}

export default Order;
