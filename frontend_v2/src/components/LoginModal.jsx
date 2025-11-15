import React from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm.jsx';

const LoginModal = ({ setModal, onLoginSuccess }) => {
  function test() {
    setModal(false);
  }
  return createPortal(
    <div onClick={() => test()} className='modal'>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>,
    document.body
  )
}

export default LoginModal
