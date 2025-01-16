import React from 'react'
import { useState, useEffect } from 'react';
import { initApp } from './game_files/App.js';

function Puzzles() {
  useEffect(() => {
    initApp(3, 3, 3);
  }, []);

  return (
    <div>
      <h1>
        2x2x2
        <div>
          <canvas className='game-surface' id="game-surface" width="500rem" height="400rem" background-color='black'>
            Your browser does not support html5
          </canvas>
        </div>
      </h1>
    </div>
  )
}

export default Puzzles
