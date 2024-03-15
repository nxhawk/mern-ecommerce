import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { createBlogCategory, getABlogCat, resetState, updateABlogCat } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Category is required'),
});

const AddblogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  const newBlogCategory = useSelector((state) => state.bCategory)
  const { isSuccess, isLoading, isError, createdBlogCategory, blogCatName,
    updatedBlogCategory } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId])

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category Added Successfully!');
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = {
          id: getBlogCatId,
          blogCatData: values
        };
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
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
          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddblogCat