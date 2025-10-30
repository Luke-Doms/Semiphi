import React, { useState } from 'react';
import SettingsNav from './SettingsNav.jsx';
import Dropdown from './Dropdown.jsx';
import Account from './Account.jsx';
import Algorithms from './Algorithms.jsx';
import Theme from './Theme.jsx';
import { IoIosArrowForward } from "react-icons/io";

function MenuSection({ title, Component }) {
  const [isOpen, setIsOpen] = useState(true);
  const [rotated, setRotated] = useState(true);

  const toggleSection = () => {
    setIsOpen(prev => !prev);
    setRotated(prev => !prev);
  };

  return (
    <div className="menu-section-container">
      <div className="settings-menu-heading" onClick={toggleSection}>
        <Dropdown section={title} />
        <IoIosArrowForward className={`settings-icon ${rotated ? 'rotated' : ''}`} />
      </div>

      {isOpen && (
        <div className="menu-section-body">
          <Component />
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  const sections = [
    { id: "account", title: "Account", component: Account },
    { id: "theme", title: "Theme", component: Theme },
    { id: "algorithms", title: "Algorithms", component: Algorithms },
  ];

  return (
    <div>
      <SettingsNav />
      <div className="settings-menu">
        {sections.map(({ id, title, component: Component }) => (
          <MenuSection key={id} title={title} Component={Component} />
        ))}
      </div>
    </div>
  );
}
