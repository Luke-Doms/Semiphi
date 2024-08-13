import React from 'react';
import Logo from '../assets/tempLogo.jpg';
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  let location = useLocation();

  return (
    <div className='nav-container'>
        <img className='logo' src={Logo} alt="Semiphi logo"/>
        <nav className='main-navbar'>
          <div className='link-wrapper'>
            <div style={location.pathname == '/' ? {width:5} : {width:0}} className='selector'></div>
            <Link style={location.pathname == '/' ? {color:'var(--highlight-color)'} : {color:'var(--text-color)'}} to='/'>Home</Link>
          </div >
          <div className='link-wrapper'>
            <div style={location.pathname == '/Puzzles' ? {width:5} : {width:0}} className='selector'></div>
            <Link style={location.pathname == '/Puzzles' ? {color:'var(--highlight-color)'} : {color:'var(--text-color)'}} to='/Puzzles'>Puzzles</Link>
          </div>
          <div className='link-wrapper'>
            <div style={location.pathname == '/Settings' ? {width:5} : {width:0}} className='selector'></div>
            <Link style={location.pathname == '/Settings' ? {color:'var(--highlight-color)'} : {color:'var(--text-color)'}} to='/Settings'>Settings</Link>
          </div>
        </nav>
    </div>
  )
}

export default NavBar