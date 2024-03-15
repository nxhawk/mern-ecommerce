import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { createCategory, getAProductCategory, resetState, updateAProductCategory } from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Product Category is required'),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory)
  const { isSuccess, isLoading, isError, createdCategory, categoryName, updatedCategory } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId])

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category Added Successfully!');
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = {
          id: getPCatId,
          pCatData: values
        }
        dispatch(updateAProductCategory(data))

      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>{getPCatId !== undefined ? "Edit" : "Add"} Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label='Enter Product Category'
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
          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getPCatId !== undefined ? "Edit" : "Add"} Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddCat