import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'

import productcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import watch from '../images/watch.jpg';
import watch2 from '../images/speaker.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';

const ProductCard = ({ grid }) => {
  let location = useLocation();

  return (
    <>
      <div className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
        <Link to={`${location.pathname === "/" ? '/product/:id' : location.pathname === "/product/:id" ? '/product/:id' : ':id'}`} className='product-card position-relative'>
          <div className='wishlist-icon position-absolute'>
            <button className='border-0 bg-transparent'>
              <img src={wish} alt='wishlist' />
            </button>
          </div>
          <div className='product-image'>
            <img src={watch} alt='product' className='img-fluid' />
            <img src={watch2} alt='product' className='img-fluid' />
          </div>
          <div className='product-details'>
            <h6 className='brand'>Havels</h6>
            <h5 className='product-title'>
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id vehicula lorem, ut egestas est. Nullam ut porta lorem, consequat venenatis magna. Vestibulum eleifend quam quis tincidunt euismod..</p>
            <p className='price'>$100.00</p>
          </div>
          <div className='action-bar position-absolute'>
            <div className='d-flex flex-column gap-15'>
              <Link>
                <img src={productcompare} alt='prodcompare' />
              </Link>
              <Link>
                <img src={view} alt='view' />
              </Link>
              <Link>
                <img src={addcart} alt='addcart' />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard