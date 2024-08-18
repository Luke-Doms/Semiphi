import React from 'react'
import Backdrop from './Backdrop.jsx'

function ContactUs() {
  return (
    <div>
      <Backdrop />
      <div className='contact-us'>
          <form className='contact-form'>
              <input type='text' placeholder='Subject'></input>
              <input className='contact-form-message' placeholder='Message' type='text'></input>
              <input type='submit'></input>
          </form>
      </div>
    </div>
  )
}

export default ContactUs