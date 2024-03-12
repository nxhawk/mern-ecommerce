import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let schema = Yup.object().shape({
    email: Yup.string().email('Email should be valid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    }
  })
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate('/admin')
    } else {

    }
  }, [user, isLoading, isError, isSuccess, message])
  return (
    <div className='py-5' style={{ "background": "#ffd333", "minHeight": "100vh" }}>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center title'>Login</h3>
        <p className='text-center'>Login to your account to continue.</p>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            name='email'
            val={formik.values.email}
            i_id='email'
            label='Email address'
            onCh={formik.handleChange('email')}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email ? (
              <div>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <CustomInput
            type='password'
            name='password'
            i_id='pass'
            label='Password'
            onCh={formik.handleChange('password')}
            val={formik.values.password}
          />
          <div className='error'>
            {formik.touched.password && formik.errors.password ? (
              <div>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className='mb-3 text-end'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          <button
            type='submit'
            className='border-0 px-3 py-2 text-white text-center text-decoration-none fs-5 fw-bold w-100'
            style={{ "background": "#ffd333" }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login