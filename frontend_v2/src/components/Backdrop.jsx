import React from 'react'

const Modal = (props) => {
  return (
    <div onClick={() => props.closeModal()} className='modal'></div>
  )
}

export default Modal