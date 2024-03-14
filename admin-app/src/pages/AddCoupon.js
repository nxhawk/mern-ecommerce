import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createCoupon, resetState } from '../features/coupon/couponSlice';

let schema = yup.object().shape({
  name: yup.string().required('Coupon Name is required'),
  expiry: yup.date().required('Expiry Date is required'),
  discount: yup.number().required('Discount Percentage is Required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon)
  const { isSuccess, isLoading, isError, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfullly!');
    } else if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>Add Coupon</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label='Enter Coupon Name'
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className='error'>
            {formik.touched.name && formik.errors.name ? (
              <div>
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <CustomInput
            type='date'
            label='Enter Expiry Date'
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className='error'>
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>
                {formik.errors.expiry}
              </div>
            ) : null}
          </div>
          <CustomInput
            type='number'
            label='Enter Discount'
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className='error'>
            {formik.touched.discount && formik.errors.discount ? (
              <div>
                {formik.errors.discount}
              </div>
            ) : null}
          </div>

          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon