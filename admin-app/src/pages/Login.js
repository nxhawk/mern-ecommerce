import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='py-5' style={{ "background": "#ffd333", "minHeight": "100vh" }}>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center'>Login</h3>
        <p className='text-center'>Login to your account to continue.</p>
        <form action=''>
          <CustomInput type='text' i_id='email' label='Email address' />
          <CustomInput type='password' i_id='pass' label='Password' />
          <div className='mb-3 text-end'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          <Link to='/admin'
            type='submit'
            className='border-0 px-3 py-2 text-white text-center text-decoration-none fs-5 fw-bold w-100'
            style={{ "background": "#ffd333" }}>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Login