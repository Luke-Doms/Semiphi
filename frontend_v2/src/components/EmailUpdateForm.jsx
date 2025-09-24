import { React } from 'react';

function EmailUpdateForm() {

  return (
    <div className='password-update-menu'>
      <span>Email</span>
      <paragraph>Modify your current email for notifications</paragraph>
      <form className='update-form'>
        <div className='update-inputs'>
          <label>New email</label>
          <input type='text'></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default EmailUpdateForm
