import * as actions from './actions';

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 4,
};

const ingredientPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + ingredientPrices[action.ingredient],
      };
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - ingredientPrices[action.ingredient],
      };
    default:
      return state;
  }
};

export default reducer;