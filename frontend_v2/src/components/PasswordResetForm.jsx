import { React } from 'react';
import { useState } from  'react';

function PasswordResetForm() {
  const [ currentPassword, setCurrentPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/reset-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      console.log("API response: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className='password-update-menu'>
      <span>Password</span>
      <paragraph>Modify your current password</paragraph>
      <form className='update-form' onSubmit={handleSubmit}>
        <div className='update-inputs'>
          <label>Current password</label>
          <input type='password' value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)}></input>
        </div>
        <div className='update-inputs'>
          <label>New password</label>
          <input type='password' value={newPassword} onChange={(event) => setNewPassword(event.target.value)}></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default PasswordResetForm
