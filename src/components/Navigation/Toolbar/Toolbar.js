import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import './Toolbar.scss';

const Toolbar = (props) => {
  return (
    <header className="toolbar">
      <DrawerToggle onClick={props.onSideDrawerOpen} />
      <Logo />
      <NavigationItems />
    </header>
  )
};

export default Toolbar;
