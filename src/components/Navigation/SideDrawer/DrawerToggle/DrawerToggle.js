import React from 'react';
import './DrawerToggle.scss';

const DrawerToggle = (props) => {
  return (
    <div className="drawer-toggle" onClick={props.onClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;