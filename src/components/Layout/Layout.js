import React from 'react';
import './layout.scss';

const Layout = (props) => (
  <div className="layout">
    <div>toolbar, side drawer, backdrop</div>
    <main>{props.children}</main>
  </div>
);

export default Layout;