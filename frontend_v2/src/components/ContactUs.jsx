import React from 'react'

function ContactUs() {
  return (
    <div className='contact-us'>
        <form className='contact-form'>
            <input type='text' placeholder='Subject'></input>
            <input className='contact-form-message' placeholder='Message' type='text'></input>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default ContactUs