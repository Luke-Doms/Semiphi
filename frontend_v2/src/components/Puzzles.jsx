import React from 'react'
import { useState, useEffect } from 'react';
import { initApp } from './game_files/App.js';
import PuzzleCommands from './PuzzleCommands.jsx';

function Puzzles(props) {
  const [ reset, incrementReset ] = useState(0);
  useEffect(() => {
  initApp(props.puzzleDimensions.x, props.puzzleDimensions.y, props.puzzleDimensions.z);
  }, [props.puzzleDimensions, reset]);

  return (
    <div className='puzzleBox'>
      <h1>
        2x2x2
      </h1>
      <canvas className='game-surface' id="game-surface" width="500rem" height="400rem" background-color='black'>
        Your browser does not support html5
      </canvas>
      <PuzzleCommands triggerReset={() => incrementReset(n => n + 1)}/>
    </div>
  )
}

export default Puzzles
