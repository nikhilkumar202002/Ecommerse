import React from 'react'
import './SignInpage.css'
import Signinimg from '../Images/signinup.jpg'
import { Link } from 'react-router-dom'

function SignInpage() {
  return (
    <>
    <section className='hero'>
        <div className='sign_in_main'>
            <div className='sign_in_left'>
                <div className='sign_in_pattern'>
                    <img src={Signinimg} alt="" />
                </div>
            </div>
            <div className='sign_in_right'>
                <div className='sign_in_heading'>
                  <h1>Welcome Back!</h1>
                  <p>Welcome Back! Enjoy your Shopping!</p>
                </div>
                <div className='sign_in_form'>
                  <form action="">
                    <input type="text" placeholder='Email or Phone Number'/><br/>
                    <input type="password" placeholder='Password'/><br/>
                    <div className='sign_in_forgot'>
                    <p><Link to="/signup">New User?</Link></p>
                    <p>Forgot Password?</p>
                    </div>
                  
                    <button type='submit'>Log In</button><br/>
                  </form>
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default SignInpage