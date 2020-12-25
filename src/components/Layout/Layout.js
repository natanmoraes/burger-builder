import React, { Component } from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './layout.scss';

class Layout extends Component {
  state = {
    showSiteDrawer: false
  }

  openSiteDrawerHandler = () => {
    this.setState({showSiteDrawer: true});
  }

  closeSiteDrawerHandler = () => {
    this.setState({showSiteDrawer: false});
  }

  render() {
    return (
      <div className="layout">
        <Toolbar onSideDrawerOpen={this.openSiteDrawerHandler} />
        <SideDrawer show={this.state.showSiteDrawer} onClose={this.closeSiteDrawerHandler}/>
        <main>{this.props.children}</main>
      </div>
    );
  }
} 

export default Layout;