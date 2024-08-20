import React from 'react'
import ThemeBox from './ThemeBox';

function Settings() {
  const changeTheme = (theme) => {
    document.documentElement.style.setProperty('--highlight-color', theme.highlight);
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--text-color', theme.text);
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
  return (
    <div>
      <h1>Themes</h1>
      <div className='theme-container'>
        {themes.map((theme) => (
          <ThemeBox onClick={() => changeTheme(theme)} theme={theme}/>
        ))}
      </div>
    </div>
  )
}

export default Settings