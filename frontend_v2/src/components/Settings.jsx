import React, { useState } from 'react';
import ThemeBox from './ThemeBox';
import SettingsNav from './SettingsNav.jsx';
import Dropdown from './Dropdown.jsx';
import Account from './Account.jsx';
import Algorithms from './Algorithms.jsx'
import Theme from './Theme.jsx';

function Settings() {
  const changeTheme = (theme) => {
    console.log('test');
    document.documentElement.style.setProperty('--highlight-color', theme.highlight);
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--text-color', theme.text);
    fetch('/set-theme', {
      method: 'POST', 
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(theme)
    });
  }
  const themes = [{
      id: "dark", 
      primary: 'rgb(21, 31, 46)', 
      highlight: 'rgba(89, 0, 191, 1)',
      secondary: 'rgb(11, 22, 34)',
      text: 'rgb(159, 173, 189)'
    },
    {
      id: "light", 
      primary: 'rgb(232, 241, 245)', 
      highlight: 'rgb(80, 198, 240)',
      secondary: 'rgb(198, 222, 230)',
      text: 'black'
    },
    {
      id: "pookie",
      primary: 'rgb(247, 29, 226)', 
      highlight: 'rgb(239, 255, 1)',
      secondary: 'rgb(243, 8, 196)',
      text: 'rgb(121, 25, 185)'
    }, 
    {
      id: "alt dark", 
      primary: 'rgb(9, 24, 51)',
      highlight: 'rgb(234,0,217)',
      secondary: 'black', 
      text: 'rgb(255,255,255)'
    }, 
    {
      id: "soaring skies", 
      primary: 'rgb(255, 249, 242)',
      highlight: 'rgb(85, 198, 240)',
      secondary: 'rgb(229, 221, 212)', 
      text: 'rgb(30, 16, 122)'
    } //BUG: justify space between messing this up, prob need grid here.
  ];

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
