import { React } from 'react';

function PasswordResetForm() {

  return (
    <div className='password-update-menu'>
      <span>Password</span>
      <paragraph>Modify your current password</paragraph>
      <form className='update-form'>
        <div className='update-inputs'>
          <label>Current password</label>
          <input type='password'></input>
        </div>
        <div className='update-inputs'>
          <label>New password</label>
          <input type='text'></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default PasswordResetForm
