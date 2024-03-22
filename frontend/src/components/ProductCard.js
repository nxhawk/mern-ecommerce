import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'

import productcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import watch2 from '../images/speaker.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { addToWishlist } from '../features/products/productSlice'

import { useDispatch } from "react-redux"
const ProductCard = ({ grid, data }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const addtoWishlist = (id) => {
    dispatch(addToWishlist(id))
  }
  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div key={index} className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
              <div
                className='product-card position-relative'>
                <div className='wishlist-icon position-absolute'>
                  <button className='border-0 bg-transparent' onClick={(e) => { addtoWishlist(item?._id) }}>
                    <img src={wish} alt='wishlist' />
                  </button>
                </div>
                <div className='product-image'>
                  <img src={item?.images[0].url} alt='product' className='img-fluid' />
                  <img src={watch2} alt='product' className='img-fluid' />
                </div>
                <div className='product-details'>
                  <h6 className='brand'>{item?.brand}</h6>
                  <h5 className='product-title'>
                    {item?.title}
                  </h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  >
                  </p>
                  <p className='price'>$ {item?.price}</p>
                </div>
                <div className='action-bar position-absolute'>
                  <div className='d-flex flex-column gap-15'>
                    {/* <Link>
                      <img src={productcompare} alt='prodcompare' />
                    </Link> */}
                    <Link to={`/product/${item?._id}`}>
                      <img src={view} alt='view' />
                    </Link>
                    {/* <Link>
                      <img src={addcart} alt='addcart' />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }

    </>
  )
}

export default ProductCard