import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { createBrand, getABrand, resetState, updateABrand } from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required('Brand name is required'),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split('/')[3];
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isLoading, isError, createdBrand, brandName, updatedBrand } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId))
    } else {
      dispatch(resetState());
    }
  }, [getBrandId])


  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully!');
    }
    if (isSuccess && !updatedBrand) {
      toast.success('Brand Updated Successfully!');
      navigate('/admin/list-brand');
    }
    if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      if (getBrandId !== undefined) {
        const data = {
          id: getBrandId,
          brandData: values
        }
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000)
      }
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label='Enter Brand'
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className='error'>
            {formik.touched.title && formik.errors.title ? (
              <div>
                {formik.errors.title}
              </div>
            ) : null}
          </div>

          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand