import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';

import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from "react-widgets/Multiselect"
import "react-widgets/styles.css"
import Dropzone from 'react-dropzone'
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { createProduct } from '../features/product/productSlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  quantity: yup.number().required('Quantity is required'),
});


const AddProduct = () => {
  const [color, setColor] = useState([])
  const [images, setImages] = useState([])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [])

  const brandState = useSelector((state) => state.brand.brands)
  const catState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)

  const colors = []
  colorState.forEach(i => {
    colors.push({
      _id: i._id,
      color: i.title
    })
  })
  const img = []
  imgState.forEach(i => {
    img.push({
      public_id: i.public_id,
      url: i.url
    })
  })

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = img;
  }, [color, img])
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      quantity: '',
      color: '',
      images: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
    }
  })
  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
          <CustomInput
            type='text'
            label='Enter Product Title'
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

          <div className='mb-3'>
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className='error'>
            {formik.touched.description && formik.errors.description ? (
              <div>
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <CustomInput
            type='number'
            label='Enter Product Price'
            name='price'
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className='error'>
            {formik.touched.price && formik.errors.price ? (
              <div>
                {formik.errors.price}
              </div>
            ) : null}
          </div>

          <select
            name='brand'
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className='form-control py-3 mb-3'
          >
            <option value=''>Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>{i.title}</option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.brand && formik.errors.brand ? (
              <div>
                {formik.errors.brand}
              </div>
            ) : null}
          </div>
          <select
            name='category'
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className='form-control py-3 mb-3'
          >
            <option value=''>Select Category</option>
            {catState.map((i, j) => {
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
          <Multiselect
            name='color'
            dataKey="id"
            textField="color"
            data={colors}
            onChange={(e) => setColor(e)}
            onBlur={formik.handleBlur("color")}
          />
          <div className='error'>
            {formik.touched.color && formik.errors.color ? (
              <div>
                {formik.errors.color}
              </div>
            ) : null}
          </div>
          <CustomInput
            type='number'
            label='Enter Product Quantity'
            name='quantity'
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>
                {formik.errors.quantity}
              </div>
            ) : null}
          </div>
          <div className='bg-white border-1 p-5 text-center'>
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
          <div className='showimages d-flex flex-wrap gap-3'>
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
          <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct