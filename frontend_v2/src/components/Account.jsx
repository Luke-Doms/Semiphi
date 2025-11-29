import { React, useContext } from 'react';
import UsernameResetForm from './UsernameResetForm.jsx';
import PasswordResetForm from './PasswordResetForm.jsx';
import EmailUpdateForm from './EmailUpdateForm.jsx';
import { AuthContext } from './AuthContext.jsx';
import LoginPrompt from './LoginPrompt.jsx';

function Account() {
  const { user } = useContext(AuthContext);

  return (
    user ? (
      <div className='account-menu'>
        <UsernameResetForm />
        <PasswordResetForm />
        <EmailUpdateForm />
      </div>
    ) : (
      <LoginPrompt />
    )
  );
}

export default Account
