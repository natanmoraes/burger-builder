import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import './ContactData.scss';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: ''
      },
      street: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: ''
      },
      zipCode: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Zip Code',
        },
        value: ''
      },
      country: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: ''
      },
      email: {
        type: 'input',
        config: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: ''
      },
      deliveryMethod: {
        type: 'select',
        config: {
          options: [
            { value: 'fastest', label: 'Fastest' },
            { value: 'cheapest', label: 'Cheapest' },
          ]
        },
        value: ''
      },
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    let elements = [];

    for (let formElement in this.state.orderForm) {
      elements.push({
        id: formElement,
        info: this.state.orderForm[formElement],
      });
    }

    let form = (
      <form>
        {elements.map(element => (
          <Input
            key={element.id}
            type={element.info.type}
            config={element.info.config}
            value={element.info.value}
            onChange={(event) => this.inputChangedHandler(event, element.id)}
          />
        ))}
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
