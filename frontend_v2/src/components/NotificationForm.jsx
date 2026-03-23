import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationForm() {
  const [ email, setEmail ] = useState('');
  const [ error, setError ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('test');

        try {
            const res = await fetch('/update-email', {
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
                setError(true);
                setTimeout(() => setError(false), 300);
            }
        } catch(error) {
            console.log(error);
        }
  }

  return (
        <div onClick={(e) => e.stopPropagation()} className='notification-container'>
            <div className={`notification-inner ${error ? 'shake' : ''}`}>
                <div className='notification-header'>
                    <span>Notifications</span>
                </div>
                <form className='notification-form' onSubmit={handleSubmit}>
                    <input className='notification-input' type='text' placeholder='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <span className='notification-switch-text'>To recieve notifications about semiphi, add your email here.</span>
                    <input className='notification-submit' type='submit' value='Sign In'></input>
                </form>
            </div>
        </div>
  )
}

export default NotificationForm
