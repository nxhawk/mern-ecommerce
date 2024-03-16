import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createCoupon, getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
  name: yup.string().required('Coupon Name is required'),
  expiry: yup.date().required('Expiry Date is required'),
  discount: yup.number().required('Discount Percentage is Required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon)
  const { isSuccess, isLoading, isError, createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon
  } = newCoupon;

  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfullly!');
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/coupon-list");
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
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

          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon