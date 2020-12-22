import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    // const ingredients = { ...this.state.ingredients };
    const sum = Object
      .keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((value, currentElement) => {
        return value + currentElement;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const newCount = this.state.ingredients[type] + 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;

    const ingredientPrice = INGREDIENT_PRICES[type];
    const newTotalPrice = this.state.totalPrice + ingredientPrice;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice
    });

    this.updatePurchaseState(newIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }

    const newCount = this.state.ingredients[type] - 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;

    const ingredientPrice = INGREDIENT_PRICES[type];
    const newTotalPrice = this.state.totalPrice - ingredientPrice;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice
    });

    this.updatePurchaseState(newIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchasable={this.state.purchasable}
          purchase={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;