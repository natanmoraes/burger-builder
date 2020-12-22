import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

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
    totalPrice: 4
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
  }

  render() {
    const disabledInfo = {...this.state.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;