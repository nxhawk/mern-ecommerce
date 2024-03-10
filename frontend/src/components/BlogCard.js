import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (
    <div className='col-3'>
      <div className='blog-card'>
        <div className='card-images'>
          <img src='images/blog-1.jpg' alt='blog' className='img-fluid' />
        </div>
        <div className='blog-content'>
          <p className='date'>1 Dec, 2023</p>
          <h5 className='title'>A beautiful sunday morning renaissance</h5>
          <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla turpis vitae nisi pharetra, vitae porttitor lorem interdum.</p>
          <Link className='button' to='/'>Read more</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard