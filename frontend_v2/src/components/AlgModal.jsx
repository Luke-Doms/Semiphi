import React from 'react';
import { createPortal } from 'react-dom';
import AlgPopup from './AlgPopup.jsx';

const AlgModal = (props) => {
  return createPortal(
    <div onClick={() => props.setModal(false)} className='modal'>
      <AlgPopup />
    </div>,
    document.body
  )
}

export default AlgModal
