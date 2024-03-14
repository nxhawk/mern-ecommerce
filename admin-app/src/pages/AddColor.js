import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { createColor, resetState } from '../features/color/colorSlice';

let schema = yup.object().shape({
  title: yup.string().required('Color is required'),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color)
  const { isSuccess, isLoading, isError, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color Added Successfully!');
    } else if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError, createdColor])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/list-color');
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>Add Color</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='color'
            label='Enter Color'
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
          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Color</button>
        </form>
      </div>
    </div>
  )
}

export default AddColor