import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import './ContactData.scss';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'lorem ipsum',
        address: {
          street: 'lorem ipsum 123',
          zipCode: '12345',
          country: 'Brazil'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(order);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <Input type="text" name="name" placeholder="Your name" />
        <Input type="email" name="email" placeholder="Your email" />
        <Input type="text" name="street" placeholder="Your street" />
        <Input type="text" name="postalCode" placeholder="Your postal code" />
        <Button type="success" onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    return (
      <div className="contact-data">
        <h4>Enter your contact data</h4>
        { this.state.loading ? <Spinner /> : form}
      </div>
    );
  }
};

export default withErrorHandler(ContactData, axios);
