import React from 'react'
import { useState } from 'react'

function RegisterForm({ onRegisterSuccess }) {
  const [ error, setError ] = useState(false);

  return (
    <div className='register-container' onClick={e => e.stopPropagation()}>
        <div className={`register-inner ${error ? 'shake' : ''}`}>
            <div className='login-header'>
                <span>Register</span>
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
