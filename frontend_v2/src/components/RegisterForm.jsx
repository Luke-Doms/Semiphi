import React, { useState } from 'react';

function RegisterForm({ onSwitch, onRegisterSuccess }) {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname, pw }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        onRegisterSuccess();
        onSwitch();
      } else {
        setErrorMessage(data.message || 'Registration failed');
        setError(true);
        setTimeout(() => setError(false), 300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='register-container' onClick={e => e.stopPropagation()}>
      <div className={`register-inner ${error ? 'shake' : ''}`}>
        <div className='register-header'>
          <span>Register</span>
        </div>
        <form onSubmit={handleSubmit} className='register-form'>
          <input className='register-input' type='text' placeholder='username' name='uname' value={uname} onChange={e => { setUname(e.target.value); setErrorMessage(''); }} />
          <input className='register-input' type='password' placeholder='password' name='pw' value={pw} onChange={e => { setPw(e.target.value); setErrorMessage(''); }} />
          {errorMessage && <span className='register-error-message'>{errorMessage}</span>}
          <span className='register-switch-text'>Already have an account? <span onClick={onSwitch} className='register-link'>click here</span></span>
          <input className='register-submit' type='submit' value='Sign Up' />
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
