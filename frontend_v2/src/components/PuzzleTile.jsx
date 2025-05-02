import React from 'react'

function PuzzleTile(props) {
  const UpdateCurrentPuzzle = () => {
    props.setCurrentPuzzleName(props.puzzle.name);
    localStorage.setItem("currentPuzzle", props.puzzle.name);
  }

  return (
    <div className='puzzle-tile' onClick={() => {UpdateCurrentPuzzle()}}>
        <img className='puzzleImage' src={props.puzzle.image} alt="rubiks cube"/>
        <span className='puzzle-title'>{props.puzzle.name}</span>
    </div>
  )
}

export default PuzzleTile
