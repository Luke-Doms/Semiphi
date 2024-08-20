import React from 'react'
import Modal from './Modal.jsx'

function LoginForm() {
  return (
    <div>
        <Modal />
        <div className='login-container'>
            <div>
                <h2>Login</h2>
            </div>
            <form className='login-form'>
                <input type='text' placeholder='username'></input>
                <input type='password' placeholder='password'></input>
                <input type='submit' value='Sign In'></input>
            </form>
        </div>
    </div>
  )
}

export default LoginForm