import { React } from 'react';

function UsernameResetForm() {

  return (
    <div className='username-update-menu'>
      <span>Username</span>
      <paragraph>Modify your current username</paragraph>
      <form className='update-form'>
        <div className='update-inputs'>
          <label>Current password</label>
          <input type='password'></input>
        </div>
        <div className='update-inputs'>
          <label>New username</label>
          <input type='text'></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default UsernameResetForm
