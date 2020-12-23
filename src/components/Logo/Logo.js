import React from 'react';

import logoImg from '../../assets/images/burger-logo.png';
import './Logo.scss';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logoImg} alt="Burger Builder logo" width="" height="" />
    </div>
  )
};

export default Logo;
