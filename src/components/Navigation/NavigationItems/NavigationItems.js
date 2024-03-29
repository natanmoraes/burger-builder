import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.scss';

const NavigationItems = (props) => {
  return (
    <nav className="navigation">
      <ul>
        <NavigationItem to="/">Burger Builder</NavigationItem>
        <NavigationItem to="/orders">Orders</NavigationItem>
      </ul>
    </nav>
  )
};

export default NavigationItems;
