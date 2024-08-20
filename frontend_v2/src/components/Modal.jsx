import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className='modal'></div>
  )
}

export default Modal