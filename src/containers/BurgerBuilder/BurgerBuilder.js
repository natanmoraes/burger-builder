import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
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

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'lorem ipsum',
    //     address: {
    //       street: 'lorem ipsum 123',
    //       zipCode: '12345',
    //       country: 'Brazil'
    //     },
    //     email: 'test@test.com',
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let modalContent = <Spinner />;

    if (!this.state.loading && this.state.ingredients) {
      modalContent = <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        onPurchaseCancel={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler}
      />
    }

    let content = <Spinner />;

    if (this.state.error) {
      content = <p>Something went wrong.</p>
    } else if (this.state.ingredients) {
      content = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);