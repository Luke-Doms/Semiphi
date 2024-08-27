import React from 'react'
import { useState, useEffect } from 'react';
import { initApp } from './game/app.js';

function Puzzles() {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <div>
      <h1>
        2x2x2
        <div>
          <canvas className='game-surface' id="gameSurface" width="500rem" height="400rem" background-color='black'>
            Your browser does not support html5
          </canvas>
        </div>
      </h1>
    </div>
  )
}

export default Puzzles