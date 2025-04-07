import React from 'react'
import { useState, useEffect } from 'react';
import { initApp } from './game_files/App.js';
import PuzzleCommands from './PuzzleCommands.jsx';
import PuzzleStorage from './PuzzleStorage.js';

function Puzzles(props) {
  const [ reset, incrementReset ] = useState(0);
  useEffect(() => {
  const saved = localStorage.getItem("puzzles");
  if (!saved) {
    return;
  }

  const puzzles = JSON.parse(saved);
  const current = puzzles[props.currentPuzzleName];
  console.log(props.currentPuzzleName, current);
  initApp(current.dimensions.x, current.dimensions.y, current.dimensions.z, props.currentPuzzleName, PuzzleStorage);
  }, [props.currentPuzzleName, reset]);

  return (
    <div className='puzzleBox'>
      <h1>
        {props.currentPuzzleName}
      </h1>
      <canvas className='game-surface' id="game-surface" width="500rem" height="400rem" background-color='black'>
        Your browser does not support html5
      </canvas>
      <PuzzleCommands triggerReset={() => incrementReset(n => n + 1)}/>
    </div>
  )
}

export default Puzzles
