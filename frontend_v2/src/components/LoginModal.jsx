import React from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm.jsx';

const LoginModal = ({onSwitchToRegister, onClose, onLoginSuccess }) => {
  return createPortal(
    <div onClick={onClose} className='modal'>
      <LoginForm onClose={onClose} onSwitch={onSwitchToRegister} onLoginSuccess={onLoginSuccess} />
    </div>,
    document.body
  )
}

export default LoginModal
