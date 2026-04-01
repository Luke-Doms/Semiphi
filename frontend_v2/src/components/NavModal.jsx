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
      <div className='modal-navbar' onClick={e => e.stopPropagation()}>
        <nav>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} to='/Puzzles'>Puzzles</Link>
          </div>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} to='/Settings'>Settings</Link>
          </div>
          <div className='modal-link-wrapper'>
            <Link onClick={onClose} to='/'>About</Link>
          </div >
        </nav>
      </div>
    </div>,
    document.body
  );
}

export default NavModal;
