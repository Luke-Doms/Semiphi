import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { IoCloseOutline, IoMailOutline } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';

const NAV_LINKS = [
  { to: '/Puzzles',  label: 'Puzzles'  },
  { to: '/settings', label: 'Settings' },
  { to: '/',         label: 'About'    },
];

function NavModal({ onClose }) {
  const location = useLocation();
  const activePath = location.state?.background?.pathname ?? location.pathname;

  const isActive = (to) => activePath.toLowerCase() === to.toLowerCase();

  return createPortal(
    <div className="nav-modal-backdrop" onClick={onClose}>
      <div className="nav-modal-drawer" onClick={e => e.stopPropagation()}>

        <div className="nav-modal-header">
          <span>Semiphi</span>
          <button className="nav-modal-close" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <nav className="nav-modal-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`nav-modal-link${isActive(to) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-modal-footer">
          <div
            className="nav-modal-footer-link"
            onClick={() => { window.location = 'mailto:luke.doms2@gmail.com'; onClose(); }}
          >
            <IoMailOutline />
            <span>Contact Us</span>
          </div>
          <div
            className="nav-modal-footer-link"
            onClick={() => { window.open('https://github.com/Luke-Doms/Semiphi'); onClose(); }}
          >
            <VscGithub />
            <span>GitHub</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}

export default NavModal;
