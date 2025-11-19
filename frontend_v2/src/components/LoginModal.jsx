import React from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm.jsx';
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const close = () => navigate(-1);

  return createPortal(
    <div onClick={close} className='modal'>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>,
    document.body
  )
}

export default LoginModal
