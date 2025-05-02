import React from 'react';
import twocube from '../assets/2x2x2.jpg';

function Home() {
  return (
    <div>
        <div className='about-title'>
          <span>
            About
          </span>
        </div>
        <img className='homeimage' src={twocube} alt="2x2x2 rubiks cube"/>
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
