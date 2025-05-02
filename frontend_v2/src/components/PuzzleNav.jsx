import React from 'react'
import PuzzleTile from './PuzzleTile'
import twoCube from '../assets/2x2x2p.jpeg';
import threeCube from '../assets/3x3x3.jpeg';
import fourCube from '../assets/4x4x4.jpeg';
import fourByTwoCube from '../assets/2x4x4.jpeg';


function PuzzleNav(props) {
  const puzzles = [{
    id: 1,
    dimensions: {x: 2, y: 2, z: 2},
    image: twoCube, 
    name: "2×2×2"
    }, 
    {
    id: 2,
    dimensions: {x: 2, y: 4, z: 4},
    image: fourByTwoCube, 
    name: "2×4×4"
    }, 
    {
    id: 3,
    dimensions: {x: 3, y: 3, z: 3},
    image: threeCube,
    name: "3×3×3"
    }, 
    {
    id: 4,
    dimensions: {x: 4, y: 4, z: 4},
    image: fourCube, 
    name: "4×4×4"
    } 
  ];


  return (
    <div id='puzzleNav' className='puzzle-nav-container'>
        <div className='puzzle-nav-title'>
            <span>Puzzles</span>
        </div>
        <nav className='puzzle-navbar'>
            {puzzles.map((puzzle) => ( 
                <PuzzleTile key={puzzle.id} puzzle={puzzle} setCurrentPuzzleName={props.setCurrentPuzzleName}/>
            ))}
        </nav>
    </div>
  )
}

export default PuzzleNav
