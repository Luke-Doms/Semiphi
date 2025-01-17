import React from 'react'
import PuzzleTile from './PuzzleTile'
import twoCube from '../assets/2x2x2p.jpeg';
import threeCube from '../assets/3x3x3.jpeg';
import fourCube from '../assets/4x4x4.jpeg';
import fourByTwoCube from '../assets/2x4x4.jpeg';


function PuzzleNav(props) {
  const puzzles = [{
    dimensions: {x: 2, y: 2, z: 2},
    image: twoCube, 
    name: "2x2x2"
    }, 
    {
    dimensions: {x: 2, y: 4, z: 4},
    image: fourByTwoCube, 
    name: "2x4x4"
    }, 
    {
    dimensions: {x: 3, y: 3, z: 3},
    image: threeCube,
    name: "3x3x3"
    }, 
    {
    dimensions: {x: 4, y: 4, z: 4},
    image: fourCube, 
    name: "4x4x4"
    } 
  ];


  return (
    <div id='puzzleNav' className='puzzle-nav-container'>
        <h2>Puzzles</h2>
        <nav className='puzzle-navbar'>
            {puzzles.map((puzzle) => ( 
                <PuzzleTile puzzle={puzzle} onDimensionSelect={props.onDimensionSelect}/>
            ))}
        </nav>
    </div>
  )
}

export default PuzzleNav
