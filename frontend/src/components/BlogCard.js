import React from 'react'
import { Link } from 'react-router-dom'
import blog from '../images/blog-1.jpg';

const BlogCard = ({ id, title, description, image, date }) => {
  return (
    <div className='blog-card'>
      <div className='card-images'>
        <img src={image ? image : blog} alt='blog' className='img-fluid w-100' />
      </div>
      <div className='blog-content'>
        <p className='date'>{date}</p>
        <h5 className='title'>{title}</h5>
        <p className='desc'
          dangerouslySetInnerHTML={{ __html: description?.substr(0, 70) + '...' }}
        ></p>
        <Link to={`/blog/${id}`} className='button'>Read more</Link>
      </div>
    </div>
  )
}

export default BlogCard