import React from 'react'
import { PiShuffleSimpleLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import { IoRefreshOutline } from "react-icons/io5";
import { PiUploadSimpleLight } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AlgModal from "./AlgModal.jsx";
import PuzzleStorage from './PuzzleStorage.js';

function PuzzleCommands(props) {
  const [ modal, setModal ] = useState(false);
  const reset = () => {
    props.triggerReset();
    PuzzleStorage.reset(props.currentPuzzleName);
    console.log('test');
  }

  return (
      <div className='puzzle-commands'>
        <IoRefreshOutline onClick={reset}/>
        <PiShuffleSimpleLight onClick={props.onShuffle}/>
        <CiSaveDown2 onClick={props.onSave}/>
        <PiUploadSimpleLight onClick={props.onLoad}/>
        <IoIosAddCircleOutline onClick={() => setModal(true)}/>
        { modal ? <AlgModal setModal={setModal}/> : null}
      </div>
  )
}

export default PuzzleCommands
