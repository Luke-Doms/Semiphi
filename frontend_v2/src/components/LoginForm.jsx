import React from 'react'
import Modal from './Modal.jsx'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  function redirect() {
    navigate('/register');
  }
  return (
    <div>
        <Modal />
        <div className='login-container'>
            <div className='login-header'>
                <span>Login</span>
            </div>
            <form method='POST' action='/login' className='login-form'>
                <input type='text' placeholder='username' name='uname'></input>
                <input type='password' placeholder='password' name='pw'></input>
                <span>Dont have an account? </span>
                <span onClick={() => redirect()} className='login-link'>click here</span>
                <input type='submit' value='Sign In'></input>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
