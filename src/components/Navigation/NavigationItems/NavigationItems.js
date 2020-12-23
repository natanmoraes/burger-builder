import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.scss';

const NavigationItems = (props) => {
  return (
    <nav className="navigation">
      <ul>
        <NavigationItem href="/" active>Burger Builder</NavigationItem>
        <NavigationItem href="/">Checkout</NavigationItem>
      </ul>
    </nav>
  )
};

export default NavigationItems;
