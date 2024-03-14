import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { createBlogCategory, resetState } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Category is required'),
});

const AddblogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state.bCategory)
  const { isSuccess, isLoading, isError, createdBlogCategory } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category Added Successfully!');
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
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/blog-category-list');
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>Add Blog Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label='Enter Blog Category'
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
          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddblogCat