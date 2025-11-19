import React from 'react';
import { createPortal } from 'react-dom';
import RegisterForm from './RegisterForm.jsx';
import { useNavigate, useLocation } from "react-router-dom";


const RegisterModal = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => {
      const background = location.state?.background?.pathname;
      if (background) navigate(background);
      else navigate(-1);
  };

  return createPortal(
    <div onClick={close} className='modal'>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
    </div>,
    document.body
  )
}

export default RegisterModal
