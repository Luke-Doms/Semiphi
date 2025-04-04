import React from 'react'
import { IoMdShuffle } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

function PuzzleCommands(props) {
  return (
    <div className='puzzle-commands'>
      <IoMdShuffle />
      <CiSaveDown2 />
      <GrPowerReset />
      <MdOutlineFileUpload />
      <IoIosAddCircleOutline />
    </div>
  )
}

export default PuzzleCommands
