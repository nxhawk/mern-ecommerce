import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

import { useLocation } from "react-router-dom"

import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetPassword } from '../features/user/userSlice'

let schema = yup.object().shape({
  password: yup.string().required('Password is required'),
});


const Resetpassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split('/')[2]

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(resetPassword({
        token: getToken,
        password: values.password
      }));

      setTimeout(() => {
        navigate('/')
      }, 300)
    }
  })
  return (
    <>
      <Meta title='Reset Password' />
      <BreadCrumb title='Reset Password' />
      <Container class1='login-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Reset Password</h3>
              <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustomInput type='password' name='password' placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <div className='error'>
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <CustomInput type='password' name='confpassword' placeholder='Confirm Password' />
                <div>
                  <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0' type='submit'>Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Resetpassword