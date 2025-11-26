import React from 'react';
import Logo from '../assets/Logo.svg';
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  let location = useLocation();
  const background = location.state?.background;

  const isPuzzlePage =
    location.pathname === "/Puzzles" ||
    background?.pathname === "/Puzzles";

  const isAboutPage =
    location.pathname === "/" ||
    background?.pathname === "/";

  const isSettingsPage =
    location.pathname === "/Settings" ||
    background?.pathname === "/Settings";

  return (
    <div className='nav-container'>
        <svg
          width="50px"
          height="50px"
          viewBox="0 -1225.1 3295.4 1982.4"
          aria-hidden="true"
          className='logo'
          fill="red"
        >
          <defs>
            <path
              id="MJX-7-TEX-N-22CA"
              d="M146 472Q146 479 152 485T166 492Q171 492 189 475T279 386L386 279L495 386Q598 492 608 492Q615 492 628 479V21Q615 8 608 8Q599 8 495 115L386 221L279 115Q204 40 188 24T166 8Q159 8 153 14T146 28Q146 37 253 144L359 250L253 357Q146 464 146 472ZM588 77V424L499 337L415 250L588 77Z"
            />
            <path
              id="MJX-7-TEX-I-1D711"
              d="M92 210Q92 176 106 149T142 108T185 85T220 72L235 70L237 71L250 112Q268 170 283 211T322 299T370 375T429 423T502 442Q547 442 582 410T618 302Q618 224 575 152T457 35T299 -10Q273 -10 273 -12L266 -48Q260 -83 252 -125T241 -179Q236 -203 215 -212Q204 -218 190 -218Q159 -215 159 -185Q159 -175 214 -2L209 0Q204 2 195 5T173 14T147 28T120 46T94 71T71 103T56 142T50 190Q50 238 76 311T149 431H162Q183 431 183 423Q183 417 175 409Q134 361 114 300T92 210ZM574 278Q574 320 550 344T486 369Q437 369 394 329T323 218Q309 184 295 109L286 64Q304 62 306 62Q423 62 498 131T574 278Z"
            />
          </defs>
          <g className='logo' stroke="none" fill="red" strokeWidth="0" transform="scale(1,-1)">
            <g>
              <g transform="scale(2.49)">
                <g>
                  <g>
                    <g>
                      <use href="#MJX-7-TEX-N-22CA" />
                    </g>
                    <g transform="translate(811,-150) scale(0.707)">
                      <g>
                        <use href="#MJX-7-TEX-I-1D711" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <nav className='main-navbar'>
          <div className='link-wrapper'>
            <div style={ isPuzzlePage ? {width:5} : {width:0}} className='selector'></div>
            <Link style={ isPuzzlePage ? {color:'var(--highlight-color)'} : null } to='/Puzzles'>Puzzles</Link>
          </div>
          <div className='link-wrapper'>
            <div style={ isSettingsPage ? {width:5} : {width:0}} className='selector'></div>
            <Link style={ isSettingsPage ? {color:'var(--highlight-color)'} : null } to='/Settings'>Settings</Link>
          </div>
          <div className='link-wrapper'>
            <div style={ isAboutPage ? {width:5} : {width:0}} className='selector'></div>
            <Link className='testing' style={ isAboutPage ? {color:'var(--highlight-color)'} : null } to='/'>About</Link>
          </div >
        </nav>
    </div>
  )
}

export default NavBar
