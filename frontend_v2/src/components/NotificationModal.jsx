import React from 'react';
import { createPortal } from 'react-dom';
import NotificationForm from './NotificationForm.jsx';

const NotificationModal = ({ setModal }) => {
  function test() {
    console.log('testing on click modal');
    setModal(false);
  }
  return createPortal(
    <div onClick={() => test()} className='modal'>
      <NotificationForm />
    </div>,
    document.body
  )
}

export default NotificationModal
