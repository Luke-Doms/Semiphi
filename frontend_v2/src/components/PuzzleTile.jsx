import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext.js'

function PuzzleTile(props) {
  const { theme, setTheme, highlight, setHighlight } = useContext(ThemeContext);

  const UpdateCurrentPuzzle = () => {
    props.setCurrentPuzzleName(props.puzzle.name);
    localStorage.setItem("currentPuzzle", props.puzzle.name);
  }

  const imageSrc = theme === "dark" ? props.puzzle.images.dark : props.puzzle.images.light;

  return (
    <div className='puzzle-tile' onClick={() => {UpdateCurrentPuzzle()}}>
        <img className='puzzleImage' src={imageSrc} alt="rubiks cube"/>
        <span className='puzzle-title'>{props.puzzle.name}</span>
    </div>
  )
}

export default PuzzleTile
