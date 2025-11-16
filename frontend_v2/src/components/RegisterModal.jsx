import React from 'react';
import { createPortal } from 'react-dom';
import RegisterForm from './RegisterForm.jsx';

const RegisterModal = ({ setModal, onRegisterSuccess }) => {
  function test() {
    console.log('test');
    setModal(false);
  }
  return createPortal(
    <div onClick={() => test()} className='modal'>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
    </div>,
    document.body
  )
}

export default RegisterModal
