import React from 'react';
import { useState } from 'react';
import Modal from './Modal.jsx';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [ uname, setUname] = useState('');
  const [ pw, setPw] = useState('');
  const navigate = useNavigate();

  function redirect() {
    navigate('/register');
  }

  const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('test');

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ uname, pw }), 
                credentials: 'include'
            });

            const data = await res.json();
            console.log("API response: ", data);
            if (data.success) {
                console.log('login success');
                navigate('/');
            } else {
                console.log('login failure');
                navigate('/login');
            }
        } catch(error) {
            console.log(error);
        }
  }

  return (
    <div>
        <Modal />
        <div className='login-container'>
            <div className='login-header'>
                <span>Login</span>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>
                <input type='text' placeholder='username' name='uname' value={uname} onChange={(event) => setUname(event.target.value)}></input>
                <input type='password' placeholder='password' name='pw' value={pw} onChange={(event) => setPw(event.target.value)}></input>
                <span>Dont have an account? </span>
                <span onClick={() => redirect()} className='login-link'>click here</span>
                <input type='submit' value='Sign In'></input>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
