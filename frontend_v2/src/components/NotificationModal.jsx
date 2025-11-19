import React from 'react';
import { createPortal } from 'react-dom';
import NotificationForm from './NotificationForm.jsx';
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ onNotificationSuccess }) => {
  const navigate = useNavigate();
  const close = () => {
    navigate(-1);
  }
  return createPortal(
    <div onClick={() => close()} className='modal'>
      <NotificationForm />
    </div>,
    document.body
  )
}

export default NotificationModal
