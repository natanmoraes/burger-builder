import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-7f03e-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  isPurchasable = () => {
    const ingredients = this.props.ingredients;
    const sum = Object
      .keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((value, currentElement) => {
        return value + currentElement;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push('price=' + this.props.totalPrice);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let modalContent = <Spinner />;

    if (!this.state.loading && this.props.ingredients) {
      modalContent = <OrderSummary
        ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        onPurchaseCancel={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler}
      />
    }

    let content = <Spinner />;

    if (this.state.error) {
      content = <p>Something went wrong.</p>
    } else if (this.props.ingredients) {
      content = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabledInfo={disabledInfo}
            purchasable={this.isPurchasable()}
            onPurchase={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} onModalClose={this.purchaseCancelHandler}>
          {modalContent}
        </Modal>
        {content}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    addIngredient: ingredient => dispatch({ type: actions.ADD_INGREDIENT, ingredient: ingredient }),
    removeIngredient: ingredient => dispatch({ type: actions.REMOVE_INGREDIENT, ingredient: ingredient }),
  }
};

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));