import React, { useState } from 'react';
import SettingsNav from './SettingsNav.jsx';
import Dropdown from './Dropdown.jsx';
import Account from './Account.jsx';
import Algorithms from './Algorithms.jsx'
import Theme from './Theme.jsx';

function Settings() {

  const sections = [
      {
        id: "account",
        title: "Account",
        isOpen: true,
        component: Account
      }, 
      { 
        id: "theme",
        title: "Theme",
        isOpen: true,
        component: Theme
      }, 
      { 
        id: "algorithms",
        title: "Algorithms",
        isOpen: true,
        component: Algorithms
      }
  ]

  const [sectionsState, setSectionsState] = useState(
    sections.map(section => ({ ...section }))
  );

  function toggleSection(id) {
    setSectionsState(prevSections => 
      prevSections.map(section => 
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  }

  return (
    <div>
      <SettingsNav/>
      <div className='settings-menu'>
          {sectionsState.map((section) => (
              <div key={section.id} className="menu-section-container">
                  <div onClick={() => toggleSection(section.id)}>
                      <Dropdown section={section.title}/>
                  </div>
                  {section.isOpen && (
                  <div className="menu-section-body">
                      {React.createElement(section.component)}
                  </div>
                  )}
              </div>
              ))}
      </div>
    </div>
  )
}

export default Settings
