import React from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm.jsx';
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setModal, onLoginSuccess }) => {
  const navigate = useNavigate();

  function test() {
    setModal(false);
  }
  const close = () => navigate(-1);

  return createPortal(
    <div onClick={close} className='modal'>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>,
    document.body
  )
}

export default LoginModal
