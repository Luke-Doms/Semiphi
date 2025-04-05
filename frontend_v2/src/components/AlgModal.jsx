import React from 'react';
import AlgPopup from './AlgPopup.jsx';

const AlgModal = (props) => {
  return (
    <div onClick={() => props.setModal(false)} className='modal'>
      <AlgPopup />
    </div>
  )
}

export default AlgModal
