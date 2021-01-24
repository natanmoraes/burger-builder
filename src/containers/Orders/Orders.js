import React, { Component } from 'react';

import Order from '../../components/Order/Order';

export class Orders extends Component {
  render() {
    return (
      <div className="orders">
        <Order />
        <Order /> 
      </div>
    );
  }
}

export default Orders;
