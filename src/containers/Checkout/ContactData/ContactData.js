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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: ''
      },
      street: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Street',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: ''
      },
      zipCode: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Zip Code',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        value: ''
      },
      country: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Country',
        },
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
        value: ''
      },
      email: {
        type: 'input',
        config: {
          type: 'email',
          placeholder: 'Your Email',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
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
        value: 'fastest'
      },
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    let formData = {}

    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      data: formData,
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

  isValueValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, element) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[element]
    };

    updatedFormElement.value = event.target.value;

    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.isValueValid(updatedFormElement.value, updatedFormElement.validation);
    }

    updatedFormElement.touched = true;
    updatedOrderForm[element] = updatedFormElement;

    let formIsValid = true;

    for (let element in updatedOrderForm) {
      if (updatedFormElement.validation && updatedOrderForm[element].valid === false) {
        formIsValid = false;
        break;
      }
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
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
      <form onSubmit={this.orderHandler}>
        {elements.map(element => (
          <Input
            key={element.id}
            type={element.info.type}
            config={element.info.config}
            value={element.info.value}
            isValid={element.info.valid}
            shouldValidate={element.info.validation}
            wasTouched={element.info.touched}
            onChange={(event) => this.inputChangedHandler(event, element.id)}
          />
        ))}
        <Button type="success" disabled={!this.state.formIsValid}>ORDER</Button>
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
