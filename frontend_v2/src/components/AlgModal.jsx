import React from 'react';
import { createPortal } from 'react-dom';
import AlgPopup from './AlgPopup.jsx';

const AlgModal = ({ puzzleName, dimensions, setModal }) => {
  return createPortal(
    <div onClick={() => setModal(false)} className='modal'>
      <AlgPopup puzzleName={puzzleName} dimensions={dimensions}/>
    </div>,
    document.body
  )
}

export default AlgModal
