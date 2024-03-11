import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from "react-icons/hi"
import blog from '../images/blog-1.jpg'

const SingleBlog = () => {
  return (
    <>
      <Meta title='Dynamic Blog Name' />
      <BreadCrumb title='Dynamic Blog Name' />
      <div className='blog-wrapper home-wrapper-2 py-5'>
        <div className='container-xl'>
          <div className='row'>
            <div className='col-12'>
              <div className='single-blog-card'>
                <Link to='/blogs' className='d-flex align-items-center gap-10'>
                  <HiOutlineArrowLeft className='fs-4' />
                  Go back to Blogs</Link>
                <h3 className='title'>A Beautiful Sunday Morning Renaissance</h3>
                <img src={blog} alt='blog' className='img-fluid w-100 my-4' />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper purus et varius varius. Aenean a turpis sagittis nulla scelerisque vulputate. Donec ut velit nec tellus consectetur aliquet. Praesent euismod, arcu eget imperdiet sodales, ipsum ante ultricies purus, eget sollicitudin velit elit eu justo. Fusce auctor sapien turpis, ac posuere velit cursus in. Cras eu eros augue. Aliquam lobortis purus ut dolor sollicitudin, eget luctus quam consequat. Suspendisse leo velit, commodo in arcu eget, malesuada tristique mi. Duis at purus non justo dapibus pharetra id in est. Nulla facilisi. Phasellus vitae pharetra libero, vitae lacinia ligula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlog