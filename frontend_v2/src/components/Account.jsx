import React from 'react';
import UsernameResetForm from './UsernameResetForm.jsx';
import PasswordResetForm from './PasswordResetForm.jsx';
import EmailUpdateForm from './EmailUpdateForm.jsx';

function Account() {
  return (
        <div className='account-menu'>
            <UsernameResetForm />
            <PasswordResetForm />
            <EmailUpdateForm />
        </div>
  );
}

export default Account
