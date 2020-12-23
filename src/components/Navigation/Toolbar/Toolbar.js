import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.scss';

const Toolbar = (props) => {
  return (
    <header className="toolbar">
      <div>MENU</div>
      <Logo />
      <NavigationItems />
    </header>
  )
};

export default Toolbar;
