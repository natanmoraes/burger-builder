import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './layout.scss';

const Layout = (props) => (
  <div className="layout">
    <Toolbar />
    <main>{props.children}</main>
  </div>
);

export default Layout;