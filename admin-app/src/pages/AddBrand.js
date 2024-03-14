import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { createBrand, resetState } from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required('Brand name is required'),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isLoading, isError, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully!');
    } else if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/list-brand');
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>Add Brand</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label='Enter Category'
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

          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand