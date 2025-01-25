import React from 'react';
import Toggle from './Toggle.jsx'

function Theme() {
{/*
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
  */}
  return (
        <div>
            <Toggle/>
        </div>
  );
}

export default Theme
