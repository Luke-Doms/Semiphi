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
            <form method='POST' action='/register' className='login-form'>
                <input type='text' placeholder='username' name='uname'></input>
                <input type='password' placeholder='password' name='pw'></input>
                <input type='submit' value='Sign Up'></input>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm