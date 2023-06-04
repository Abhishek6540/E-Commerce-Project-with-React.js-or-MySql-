import React from 'react'
import error from './OIP .jpg'
import './error.css'

const Error = () => {
  return (
    <div className='error'>
      <h1>Error</h1>
      <img src={error} alt="this is error image"/>
    </div>
  )
}

export default Error
