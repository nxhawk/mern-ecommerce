import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import watch from '../images/watch.jpg'
import Container from '../components/Container'

import { useDispatch, useSelector } from 'react-redux'

import { useFormik } from "formik"
import * as yup from "yup"
import axios from 'axios'
import { createAnOrder } from '../features/user/userSlice'

let schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address Details is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.number().required("Pincode is required")
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts)
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);


  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotalAmount(sum);
  }, [cartState])

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.color?._id,
        price: cartState[index]?.price
      })
    }

    setCartProductState(items);
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setPaymentInfo(
        {
          razorpayPaymentId: "123",
          razorpayOrderId: "324",
        }
      )

      dispatch(createAnOrder({
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
        orderItems: cartProductState,
        paymentInfo,
        shippingInfo,
      }))
    }
  })

  const checkOutHandler = async () => {

  }

  return (
    <>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-7'>
            <div className='checkout-left-data'>
              <h3 className='website-name'>Dev Corner</h3>
              <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className='text-dark' to="/cart">Cart</Link>
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">Infomation</li>
                  &nbsp; /
                  <li className="breadcrumb-item active">Shipping</li>
                  &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">Payment</li>
                </ol>
              </nav>
              <h4 className='title total'>Contact Information</h4>
              <p className='user-details total'>
                Navdeep Dahiya (admin@gmail.com)
              </p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form onSubmit={formik.handleSubmit} className='d-flex flex-wrap gap-15 justify-content-between'>
                <div className='w-100'>
                  <select name='country'
                    onChange={formik.handleChange('country')}
                    onBlur={formik.handleBlur('country')}
                    value={formik.values.country}
                    className='form-control form-select'>
                    <option value="" selected disabled>Select Country</option>
                    <option value="India">
                      India
                    </option>
                  </select>
                  <div className='error ms-2'>
                    {
                      formik.touched.country && formik.errors.country
                    }
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input className='form-control'
                    placeholder='First Name' type='text'
                    onChange={formik.handleChange('firstName')}
                    onBlur={formik.handleBlur('firstName')}
                    value={formik.values.firstName}
                    name='firstName'
                  />
                  <div className='error ms-2'>
                    {
                      formik.touched.firstName && formik.errors.firstName
                    }
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input className='form-control'
                    placeholder='Last Name' type='text'
                    onChange={formik.handleChange('lastName')}
                    onBlur={formik.handleBlur('lastName')}
                    value={formik.values.lastName}
                    name='lastName'
                  />
                  <div className='error ms-2'>
                    {
                      formik.touched.lastName && formik.errors.lastName
                    }
                  </div>
                </div>
                <div className='w-100'>
                  <input className='form-control'
                    placeholder='Address' type='text'
                    onChange={formik.handleChange('address')}
                    onBlur={formik.handleBlur('address')}
                    value={formik.values.address}
                    name='address'
                  />
                  <div className='error ms-2'>
                    {
                      formik.touched.address && formik.errors.address
                    }
                  </div>
                </div>
                <div className='w-100'>
                  <input className='form-control'
                    placeholder='Apartment, Suite, etc'
                    type='text'
                    onChange={formik.handleChange('other')}
                    onBlur={formik.handleBlur('other')}
                    value={formik.values.other}
                    name="other"
                  />

                </div>
                <div className='flex-grow-1'>
                  <input className='form-control'
                    placeholder='City'
                    type='text'
                    onChange={formik.handleChange('city')}
                    onBlur={formik.handleBlur('city')}
                    value={formik.values.city}
                    name='city'
                  />
                  <div className='error ms-2'>
                    {
                      formik.touched.city && formik.errors.city
                    }
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select
                    name='state'
                    onChange={formik.handleChange('state')}
                    onBlur={formik.handleBlur('state')}
                    value={formik.values.state}
                    className='form-control form-select'>
                    <option value="" selected disabled>Select State</option>
                    <option value="Haryana" >
                      Haryana
                    </option>
                  </select>
                  <div className='error ms-2'>
                    {
                      formik.touched.state && formik.errors.state
                    }
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input className='form-control'
                    placeholder='Zipcode' type='text'
                    name='pincode'
                    onChange={formik.handleChange('pincode')}
                    onBlur={formik.handleBlur('pincode')}
                    value={formik.values.pincode}
                  />
                  <div className='error ms-2'>
                    {
                      formik.touched.pincode && formik.errors.pincode
                    }
                  </div>
                </div>
                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/cart' className='text-dark'>
                      <BiArrowBack className='me-2' />
                      Return to Cart
                    </Link>
                    <Link to='/cart' className='button'>Continue to Shipping</Link>
                    <button className='button border-0' type='submit'>
                      Place order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='col-5'>
            <div className='border-bottom py-4'>

              {
                cartState && cartState?.map((item, index) => {
                  return (
                    <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span style={{ "top": "-10px", "right": "2px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                          <img
                            width={80}
                            height={80}
                            src={item?.productId?.images[0]?.url || watch}
                            alt='product' />
                        </div>
                        <div>
                          <h5 className='total-price'>{item?.productId?.title}</h5>
                          <p className='total-price'>{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className='flex-grow-1'>
                        <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  )
                })
              }


            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Subtotal</p>
                <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>$ 5</p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>$ {totalAmount ? totalAmount + 5 : 0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout