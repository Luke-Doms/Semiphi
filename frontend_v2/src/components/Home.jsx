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
              Semiphi brings a variety of twisty puzzles to the browser, with tools that let you build and save your own algorithms. It’s designed for people who enjoy exploring puzzles creatively rather than racing through memorized solutions. The name itself is a nod to the group theoretic concepts underlying the mathemtaics of twisty puzzles. 
            </p>
        </div>
    </div>
  )
}

export default Home
