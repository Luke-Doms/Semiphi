import React from 'react';
import { createPortal } from 'react-dom';
import NotificationForm from './NotificationForm.jsx';

const NotificationModal = ({ setModal }) => {
  console.log('testing modal');
  return createPortal(
    <div onClick={() => setModal(false)} className='modal'>
      <NotificationForm />
    </div>,
    document.body
  )
}

export default NotificationModal
