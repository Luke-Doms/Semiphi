import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

function Toggle({ onToggle }) {

  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={theme == 'light' ? true : false} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
}

export default Toggle
