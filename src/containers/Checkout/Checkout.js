import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      }
      else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }


  continueCheckoutHandler = () => {
    this.props.history.replace(this.props.match.path + '/contact-data');
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="checkout">
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onContinue={this.continueCheckoutHandler}
          onCancel={this.cancelCheckoutHandler}
        />

        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
};

export default Checkout;
