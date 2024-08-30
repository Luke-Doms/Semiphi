import React from 'react'
import PuzzleTile from './PuzzleTile'

function PuzzleNav() {
  return (
    <div id='puzzleNav' className='puzzle-nav-container'>
        <h2>Puzzles</h2>
        <nav className='puzzle-navbar'>
            <PuzzleTile />
            <PuzzleTile />
            <PuzzleTile />
        </nav>
    </div>
  )
}

export default PuzzleNav