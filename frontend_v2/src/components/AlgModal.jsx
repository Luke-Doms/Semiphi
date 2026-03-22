import React from 'react';
import { createPortal } from 'react-dom';
import AlgPopup from './AlgPopup.jsx';

const AlgModal = ({ mode, algName, sequence, puzzleName, dimensions, setModal }) => {
  return createPortal(
    <div onClick={() => setModal(false)} className='modal'>
      <AlgPopup mode={mode} oldAlgName={algName} oldSequence={sequence} puzzleName={puzzleName} dimensions={dimensions} setModal={setModal}/>
    </div>,
    document.body
  )
}

export default AlgModal
