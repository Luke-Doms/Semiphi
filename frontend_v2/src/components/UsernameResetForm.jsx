import { React } from 'react';
import { useState } from 'react';

function UsernameResetForm() {
  const [ newUsername, setNewUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/reset-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername, password })
      });

      const data = await res.json();
      console.log("API response: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className='username-update-menu'>
      <span>Username</span>
      <paragraph>Modify your current username</paragraph>
      <form className='update-form' onSubmit={handleSubmit}>
        <div className='update-inputs'>
          <label>Current password</label>
          <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div className='update-inputs'>
          <label>New username</label>
          <input type='text' value={newUsername} onChange={(event) => setNewUsername(event.target.value)}></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default UsernameResetForm
