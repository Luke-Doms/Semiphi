import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const themes = {
    dark: {
      primary: 'rgb(0, 0, 0)',
      secondary: 'rgb(14, 14, 14)',
      text: 'rgb(255,255,255)',
    },
    light: {
      primary: 'rgb(232, 241, 245)',
      secondary: 'rgb(198, 222, 230)',
      text: 'black',
    },
  };

  const highlight_colors = {
    purple: 'purple', 
    magenta: 'rgb(234,0,217)',
    pink: 'pink',
    blue: 'rgb(80, 198, 240)',
    green: 'green',
    orange: 'orange'
  }

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

  const [highlight, setHighlight] = useState(() => {
    const savedHighlight = localStorage.getItem('highlight');
    return savedHighlight && highlight_colors[savedHighlight] ? savedHighlight : 'magenta';
  });

  useEffect(() => {
    const selectedHighlight = highlight_colors[highlight];

    localStorage.setItem('highlight', highlight);

    document.documentElement.style.setProperty('--highlight-color', selectedHighlight);
    //some update request
  }, [highlight]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme, highlight, setHighlight}}>
      {children}
    </ThemeContext.Provider>
  );
};;
