import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import './SideDrawer.scss';

const SideDrawer = (props) => {
  let classes = ['side-drawer'];

  if (props.show) {
    classes.push('open');
  }
  else {
    classes.push('closed');
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} onClick={props.onClose} />
      <div className={classes.join(' ')}>
        <Logo />
        <NavigationItems />
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
