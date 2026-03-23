import React from 'react';
import { useState } from 'react';

function LoginForm({ onClose, onSwitch, onLoginSuccess }) {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname, pw }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        console.log(data);
        onLoginSuccess();
        onClose();
      } else {
        setError(true);
        setTimeout(() => setError(false), 300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-container' onClick={e => e.stopPropagation()}>
      <div className={`login-inner ${error ? 'shake' : ''}`}>
        <div className='login-header'>
          <span>Login</span>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <input className='login-input' type='text' placeholder='username' name='uname' value={uname} onChange={e => setUname(e.target.value)} />
          <input className='login-input' type='password' placeholder='password' name='pw' value={pw} onChange={e => setPw(e.target.value)} />
          <span className='login-switch-text'>Don't have an account? <span onClick={onSwitch} className='login-link'>click here</span></span>
          <input className='login-submit' type='submit' value='Sign In' />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
