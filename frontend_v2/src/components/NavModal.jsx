import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

function NavModal({ onClose }) {
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

  return createPortal(
    <div onClick={onClose} className='modal'>
      <div onClick={e => e.stopPropagation()}>
        <nav className='modal-navbar'>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} style={ isPuzzlePage ? {color:'var(--highlight-color)'} : null } to='/Puzzles'>Puzzles</Link>
          </div>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} style={ isSettingsPage ? {color:'var(--highlight-color)'} : null } to='/Settings'>Settings</Link>
          </div>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} style={ isAboutPage ? {color:'var(--highlight-color)'} : null } to='/'>About</Link>
          </div >
        </nav>
      </div>
    </div>,
    document.body
  );
}

export default NavModal;
