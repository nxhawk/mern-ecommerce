import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';

import "react-widgets/styles.css"
import { getBlogCategories } from '../features/bcategory/bcategorySlice';
import { createBlog, getABlog, resetState, updateABlog } from '../features/blogs/blogSlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
});

const Addblog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const imgState = useSelector((state) => state.upload.images)
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogSate = useSelector((state) => state.blogs);
  const { isSuccess, isLoading, isError, createdBlog, blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog } = blogSate

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [])

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('Blog Added Successfully!');
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfullly!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error('Some thing went wrong');
    }
  }, [isSuccess, isLoading, isError])

  const img = []
  imgState.forEach(i => {
    img.push({
      public_id: i.public_id,
      url: i.url
    })
  })

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    }
  })

  return (
    <div>
      <h3 className='mb-4 title'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>

      <div className=''>
        <form onSubmit={formik.handleSubmit}>
          <div className='mt-4'>
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className='error'>
            {formik.touched.title && formik.errors.title ? (
              <div>
                {formik.errors.title}
              </div>
            ) : null}
          </div>

          <select
            className='form-control py-3 mt-3'
            name='category'
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value=''>Select Category</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>{i.title}</option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category ? (
              <div>
                {formik.errors.category}
              </div>
            ) : null}
          </div>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            name="description"
            onChange={formik.handleChange("description")}
            className='mt-3'
          />
          <div className='error'>
            {formik.touched.description && formik.errors.description ? (
              <div>
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div className='bg-white border-1 p-5 text-center mt-3'>
            <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className='showimages d-flex flex-wrap gap-3 mt-3'>
            {imgState?.map((i, j) => {
              return (
                <div key={j} className='position-relative'>
                  <button
                    type='button'
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className='btn-close position-absolute z-3' style={{ "top": "5px", "right": "5px" }}></button>
                  <img src={i.url} alt='images' width={200} height={200} />
                </div>
              )
            })}

          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
        </form>
      </div>
    </div>
  )
}

export default Addblog