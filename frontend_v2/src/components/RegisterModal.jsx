import React from 'react';
import { createPortal } from 'react-dom';
import RegisterForm from './RegisterForm.jsx';

const RegisterModal = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
  return createPortal(
    <div onClick={onClose} className='modal'>
      <RegisterForm onSwitch={onSwitchToLogin} onRegisterSuccess={onRegisterSuccess} />
    </div>,
    document.body
  );
};

export default RegisterModal;
