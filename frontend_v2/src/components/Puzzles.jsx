import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { initApp } from './game_files/App.js';
import PuzzleCommands from './PuzzleCommands.jsx';
import PuzzleStorage from './PuzzleStorage.js';

function Puzzles(props) {
  const [ reset, incrementReset ] = useState(0);
  const sceneRef = useRef(null);
  useEffect(() => {
    let isMounted = true;

    const saved = localStorage.getItem("puzzles");
    const puzzles = JSON.parse(saved);
    const current = puzzles[props.currentPuzzleName];

    const scene = initApp(current.dimensions.x, current.dimensions.y, current.dimensions.z, props.currentPuzzleName, PuzzleStorage);
    sceneRef.current = scene;

    scene.Load().then(() => {
      if (isMounted) {
        scene.Begin();
      }
    });

    return () => {
      isMounted = false;
      scene?.Unload();
      sceneRef.current = null;
    }
  }, [props.currentPuzzleName, reset]
  );

  const savePosition = () => {
    sceneRef.current?.SavePosition(); // now this is accessible
  };
  
  const loadPosition = () => {
    sceneRef.current?.LoadPosition();
  }

  const shuffle = () => {
    sceneRef.current?.Shuffle();
  }

  return (
    <div className='puzzleBox'>
      <div className='puzzle-title'>
        <span>
          {props.currentPuzzleName}
        </span>
      </div>
      <canvas className='game-surface' id="game-surface" width="500rem" height="400rem" background-color='black'>
        Your browser does not support html5
      </canvas>
      <PuzzleCommands 
        onShuffle={shuffle}
        onLoad={loadPosition} 
        onSave={savePosition} 
        currentPuzzleName={props.currentPuzzleName} 
        triggerReset={() => incrementReset(n => n + 1)}
      />
    </div>
  )
}

export default Puzzles
