import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import './ContactData.scss';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = () => {

  }

  render() {
    return (
      <div className="contact-data">
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Your street" />
          <input type="text" name="postalCode" placeholder="Your postal code" />
          <Button type="success" onclick={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
};

export default ContactData;
