import React from 'react';
import AlgPreview from './AlgPreview';
import AlgInputs from './AlgInputs';

const AlgModal = (props) => {
  return (
    <div onClick={() => props.setModal(false)} className='modal'>
      <div className='alg-popup'>
        <AlgPreview />
        <AlgInputs />
      </div>
    </div>
  )
}

export default AlgModal
