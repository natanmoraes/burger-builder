import React from 'react';
import './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  // Convert state from object to array
  // TODO: Think of a prettier state formate
  const ingredients = Object
    .keys(props.ingredients)
    .map((ingredientName) => {
      return [...Array(props.ingredients[ingredientName])].map((_, index) => {
        return <BurgerIngredient key={ingredientName + index} type={ingredientName} />
      });
    });

  return (
    <div id="burger">
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default Burger;