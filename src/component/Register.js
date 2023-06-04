import "./register.css"

import React from 'react'

const Register = () => {
  return (
    <div>
      <div className="register">
            <h1>Register</h1>
            <input type="text" name="name"  placeholder="Your Name"></input>
            <input type="text" name="email"  placeholder="Your Email"></input>
            <input type="password" name="password" placeholder="Your Password"></input>
            <input type="password" name="reEnterPassword" placeholder="Re-enter Password"></input>
            <input  type="file" name="file"/>
            <div className="button">Register</div>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    </div>
  )
}

export default Register