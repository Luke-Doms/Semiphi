import React, { useContext } from 'react'
import lightTwoCube from '../assets/L2x2x2.jpeg';
import darkTwoCube from '../assets/D2x2x2.jpeg';
import { ThemeContext } from './ThemeContext.js'


function Home() {
  const { theme, setTheme, highlight, setHighlight } = useContext(ThemeContext);
  const imageSrc = theme === "dark" ? darkTwoCube : lightTwoCube;

  return (
    <div>
        <div className='about-title'>
          <span>
            About
          </span>
        </div>
        <img className='homeimage' src={imageSrc} alt="2x2x2 rubiks cube"/>
        <div>
            <p className='landing'>
                Welcome to semiphi, a web application designed with the intent of bringing all variety of rubiks-style puzzles to
                to your fingers. 
            </p>
        </div>
    </div>
  )
}

export default Home
