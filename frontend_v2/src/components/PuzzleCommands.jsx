import React from 'react'
import { PiShuffleSimpleLight } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import { IoRefreshOutline } from "react-icons/io5";
import { PiUploadSimpleLight } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from './AuthContext.jsx';
import AlgModal from "./AlgModal.jsx";
import PuzzleStorage from './PuzzleStorage.js';

function PuzzleCommands({ onShuffle, onLoad, onSave, puzzleName, triggerReset, dimensions }) {
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const reset = () => {
    triggerReset();
    PuzzleStorage.reset(puzzleName);
  };

  const handleAddAlg = () => {
    if (!user) {
      navigate('/login', { state: { background: location } });
    } else {
      setModal(true);
    }
  };

  return (
    <div id='puzzle-commands' className='puzzle-commands'>
      <IoRefreshOutline onClick={reset}/>
      <PiShuffleSimpleLight onClick={onShuffle}/>
      <CiSaveDown2 onClick={onSave}/>
      <PiUploadSimpleLight onClick={onLoad}/>
      <IoIosAddCircleOutline onClick={handleAddAlg}/>
      {modal && (
        <AlgModal
          mode={"create"}
          oldAlgName={null}
          oldSequence={[]}
          puzzleName={puzzleName}
          dimensions={dimensions}
          setModal={setModal}
        />
      )}
    </div>
  );
}

export default PuzzleCommands;
