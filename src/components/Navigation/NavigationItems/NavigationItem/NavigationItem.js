import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.scss';

const NavigationItem = (props) => {
  return (
    <li className="navigation-item">
      <NavLink to={props.to} exact>
        {props.children}
      </NavLink>
    </li>
  )
};

export default NavigationItem;
