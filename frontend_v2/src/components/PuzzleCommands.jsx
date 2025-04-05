import React from 'react'
import { PiShuffleSimpleLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import { IoRefreshOutline } from "react-icons/io5";
import { PiUploadSimpleLight } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AlgModal from "./AlgModal.jsx";

function PuzzleCommands(props) {
  const [ modal, setModal ] = useState(false);

  return (
      <div className='puzzle-commands'>
        <IoRefreshOutline />
        <PiShuffleSimpleLight/>
        <CiSaveDown2 />
        <PiUploadSimpleLight/>
        <IoIosAddCircleOutline onClick={() => setModal(true)}/>
        { modal ? <AlgModal setModal={setModal}/> : null}
      </div>
  )
}

export default PuzzleCommands
