import React from 'react';
import './Navbar.css';
import Applogo from '../../../public/SVG/AppLogo/Applogo';
import Hamburger from '../../../public/SvgIcon/Hamuburger/Hamburger';

const Navbar: React.FC = () => {
  return (
    <div className='navbarContainer'>
      <Applogo />
      <div className='desktopNavbar'>
        <span>Log in</span>
        <span className='navBox'>List your business</span>
        <span className='desktopMenu navBox'>
          <p>Menu</p>
          <Hamburger Iheight='25' Iwidth='29' />
        </span>
      </div>
      <span className='mobileMenu'>
        <Hamburger />
      </span>
    </div>
  )
}

export default Navbar;