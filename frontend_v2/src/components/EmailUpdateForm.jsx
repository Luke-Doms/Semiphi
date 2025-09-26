import { React } from 'react';
import { useState } from 'react';

function EmailUpdateForm() {
  const [ email, setEmail ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      console.log("API response: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className='password-update-menu'>
      <span>Email</span>
      <paragraph>Modify your current email for notifications</paragraph>
      <form className='update-form' onSubmit={handleSubmit}>
        <div className='update-inputs'>
          <label>New email</label>
          <input type='text' value={email} onChange={(event) => setEmail(event.target.value)}></input>
        </div>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
}

export default EmailUpdateForm
