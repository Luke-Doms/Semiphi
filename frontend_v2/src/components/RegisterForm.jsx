import React from 'react'
import Modal from './Modal.jsx'

function RegisterForm() {
  return (
    <div>
        <Modal />
        <div className='login-container'>
            <div>
                <h2>Register</h2>
            </div>
            <form className='login-form'>
                <input type='text' placeholder='username'></input>
                <input type='password' placeholder='password'></input>
                <input type='submit' value='Sign Up'></input>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm