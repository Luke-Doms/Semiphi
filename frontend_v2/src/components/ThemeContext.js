import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const themes = {
    dark: {
      primary: 'rgb(0, 0, 0)',
      highlight: 'rgb(234,0,217)',
      secondary: 'rgb(14, 14, 14)',
      text: 'rgb(255,255,255)',
    },
    light: {
      primary: 'rgb(232, 241, 245)',
      highlight: 'rgb(80, 198, 240)',
      secondary: 'rgb(198, 222, 230)',
      text: 'black',
    },
  };

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Validate that the saved theme exists in themes, fallback to 'dark'
    return savedTheme && themes[savedTheme] ? savedTheme : 'dark';
  });

  useEffect(() => {
    // Validate theme before applying it
    const selectedTheme = themes[theme] || themes.dark;

    // Save the theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);

    // Apply the theme styles to the document
    document.documentElement.style.setProperty('--highlight-color', selectedTheme.highlight);
    document.documentElement.style.setProperty('--primary-color', selectedTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', selectedTheme.secondary);
    document.documentElement.style.setProperty('--text-color', selectedTheme.text);

    fetch('/set-theme', {
      method: 'POST', 
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(theme)
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};;
