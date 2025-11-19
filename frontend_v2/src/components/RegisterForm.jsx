import React from 'react'

function RegisterForm({ onRegisterSuccess }) {
  return (
    <div>
        <div className='login-container'>
            <div>
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
