import React from 'react'
import { PiShuffleSimpleLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import { IoRefreshOutline } from "react-icons/io5";
import { PiUploadSimpleLight } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AlgModal from "./AlgModal.jsx";
import PuzzleStorage from './PuzzleStorage.js';

function PuzzleCommands({ onShuffle, onLoad, onSave, puzzleName, triggerReset, dimensions }) {
  const [ modal, setModal ] = useState(false);
  const reset = () => {
    triggerReset();
    PuzzleStorage.reset(puzzleName);
  }

  return (
      <div className='puzzle-commands'>
        <IoRefreshOutline onClick={reset}/>
        <PiShuffleSimpleLight onClick={onShuffle}/>
        <CiSaveDown2 onClick={onSave}/>
        <PiUploadSimpleLight onClick={onLoad}/>
        <IoIosAddCircleOutline onClick={() => setModal(true)}/>
        { modal ? <AlgModal mode={"create"} algName={null} sequence={[]} puzzleName={puzzleName} dimensions={dimensions} setModal={setModal}/> : null}
      </div>
  )
}

export default PuzzleCommands
