import React from 'react'
import { Link } from 'react-router-dom'
import blog from '../images/blog-1.jpg';

const BlogCard = () => {
  return (
    <div className='blog-card'>
      <div className='card-images'>
        <img src={blog} alt='blog' className='img-fluid w-100' />
      </div>
      <div className='blog-content'>
        <p className='date'>1 Dec, 2023</p>
        <h5 className='title'>A beautiful sunday morning renaissance</h5>
        <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla turpis vitae nisi pharetra, vitae porttitor lorem interdum.</p>
        <Link to='/blog/:id' className='button'>Read more</Link>
      </div>
    </div>
  )
}

export default BlogCard