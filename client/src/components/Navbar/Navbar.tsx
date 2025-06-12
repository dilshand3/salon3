import React from 'react';
import './Navbar.css';
import Applogo from '../../../public/SVG/AppLogo/Applogo';
import Hamburger from '../../../public/SVG/Hamuburger/Hamburger';

const Navbar: React.FC = () => {
  return (
    <div className='navbarContainer'>
      <Applogo />
      <div className='desktopNavbar'>
        <p>Log in</p>
        <p className='navBox'>List your business</p>
        <div className='desktopMenu navBox'>
          <p>Menu</p>
          <Hamburger Iheight='25' Iwidth='29' />
        </div>
      </div>
      <p className='mobileMenu'>
        <Hamburger />
      </p>
    </div>
  )
}

export default Navbar;