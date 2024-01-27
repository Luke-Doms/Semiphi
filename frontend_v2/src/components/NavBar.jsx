import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/tempLogo.jpg';

function NavBar() {
  return (
    <div className='nav-container'>
        <img className='logo' src={Logo} alt="Semiphi logo"/>
        <nav className='main-navbar'>
            <Link to='/'>Home</Link>
            <Link to='/Puzzles'>Puzzles</Link>
            <Link to='/Settings'>Settings</Link>
        </nav>
    </div>
  )
}

export default NavBar