import React from 'react'
import PuzzleTile from './PuzzleTile'
import dTwoCube from '../assets/D2x2x2.jpeg';
import dThreeCube from '../assets/D3x3x3.jpeg';
import dFourCube from '../assets/D4x4x4.jpeg';
import dFourByTwoCube from '../assets/D2x4x4.jpeg';
import lTwoCube from '../assets/L2x2x2.jpeg';
import lThreeCube from '../assets/L3x3x3.jpeg';
import lFourCube from '../assets/L4x4x4.jpeg';
import lFourByTwoCube from '../assets/L2x4x4.jpeg';


function PuzzleNav(props) {
  const puzzles = [{
    id: 1,
    dimensions: {x: 2, y: 2, z: 2},
    images: {dark: dTwoCube, light: lTwoCube},
    name: "2×2×2"
    }, 
    {
    id: 2,
    dimensions: {x: 2, y: 4, z: 4},
    images: {dark: dFourByTwoCube, light: lFourByTwoCube},
    name: "2×4×4"
    }, 
    {
    id: 3,
    dimensions: {x: 3, y: 3, z: 3},
    images: {dark: dThreeCube, light: lThreeCube},
    name: "3×3×3"
    }, 
    {
    id: 4,
    dimensions: {x: 4, y: 4, z: 4},
    images: {dark: dFourCube, light: lFourCube},
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
