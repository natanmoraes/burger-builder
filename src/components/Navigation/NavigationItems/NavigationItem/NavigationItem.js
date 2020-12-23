import React from 'react';
import './NavigationItem.scss';

const NavigationItem = (props) => {
  const activeClass = props.active ? "active" : null;
  return (
    <li className="navigation-item">
      <a href={props.href} className={activeClass}>
        {props.children}
      </a>
    </li>
  )
};

export default NavigationItem;
