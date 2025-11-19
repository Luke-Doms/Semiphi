import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationForm() {
  const [ email, setEmail ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('test');

        try {
            const res = await fetch('/notification-signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email }), 
                credentials: 'include'
            });

            const data = await res.json();
            console.log("API response: ", data);
            if (data.success) {
                console.log('success');
                navigate('/');
            } else {
                console.log('failure');
            }
        } catch(error) {
            console.log(error);
        }
  }

  return (
        <div className='modal-overlay'>
            <div onClick={(e) => e.stopPropagation()} className='login-container'>
                <div className='login-header'>
                    <span>Notification</span>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input type='text' placeholder='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <input type='submit' value='Sign In'></input>
                </form>
            </div>
        </div>
  )
}

export default NotificationForm
