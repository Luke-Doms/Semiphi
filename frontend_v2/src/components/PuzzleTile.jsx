import React from 'react'

function PuzzleTile(props) {
  return (
    <div className='puzzle-tile' onClick={() => props.onDimensionSelect(props.puzzle.dimensions)}>
        <img className='puzzleImage' src={props.puzzle.image} alt="rubiks cube"/>
        <h3 className='puzzle-title'>{props.puzzle.name}</h3>
    </div>
  )
}

export default PuzzleTile
