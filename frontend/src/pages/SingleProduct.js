import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard'
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color'
import { useLocation } from 'react-router-dom'
import { TbGitCompare } from 'react-icons/tb'
import { AiOutlineHeart } from 'react-icons/ai'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAProduct } from '../features/products/productSlice'

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct)

  useEffect(() => {
    dispatch(getAProduct(getProductId));
  }, [])

  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  const props = { width: 400, height: 500, zoomWidth: 500, img: productState?.images[0]?.url };
  return (
    <>
      <Meta title='Product Name' />
      <BreadCrumb title='Product Name' />
      {
        productState && <>
          <Container class1='main-product-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              <div className='col-6'>
                <div className='main-product-image'>
                  <div>
                    <ReactImageZoom {...props} />
                  </div>
                </div>
                <div className='other-product-images d-flex flex-wrap gap-15'>
                  {productState?.images.map((item, index) => {
                    return (
                      <div key={index}><img src={item?.url} alt='product' className='img-fluid' /></div>
                    )
                  })}
                </div>
              </div>
              <div className='col-6'>
                <div className='main-product-details'>
                  <div className='border-bottom'>
                    <h3 className='title'>{productState?.title}</h3>
                  </div>
                  <div className='py-3'>
                    <p className='price'>$ {productState?.price}</p>
                    <div className='d-flex align-items-center gap-10'>
                      <ReactStars
                        count={5}
                        size={24}
                        value={productState?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className='mb-0 t-review'>( 2 Reviews )</p>
                    </div>
                    <a href='#review' className='review-btn'>Write a Review</a>
                  </div>
                  <div className='border-bottom py-3'>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Type: </h3>
                      <p className='product-data'>Watch</p>
                    </div>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Brand: </h3>
                      <p className='product-data'>{productState?.brand}</p>
                    </div>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Category: </h3>
                      <p className='product-data'>{productState?.category}</p>
                    </div>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Tags: </h3>
                      <p className='product-data'>{productState?.tags}</p>
                    </div>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Availability: </h3>
                      <p className='product-data'>In Stock</p>
                    </div>
                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                      <h3 className='product-heading'>Size: </h3>
                      <div className='d-flex flex-wrap gap-15'>
                        <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                        <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                        <span className='badge border border-1 bg-white text-dark border-secondary'>XL</span>
                        <span className='badge border border-1 bg-white text-dark border-secondary'>XXL</span>
                      </div>
                    </div>
                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                      <h3 className='product-heading'>Color: </h3>
                      <Color />
                    </div>
                    <div className='d-flex align-items-center gap-15 mt-2 mb-3'>
                      <h3 className='product-heading'>Quantity: </h3>
                      <div className=''>
                        <input type='number' name='' id='' style={{ "width": "70px" }} min={1} max={10} className='form-control' />
                      </div>
                      <div className='d-flex align-items-center gap-30 ms-4'>
                        <button className='button border-0'>Add to Cart</button>
                        <button className='button signup'>Buy It Now</button>
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-15'>
                      <div>
                        <a href='/'><TbGitCompare className='fs-5 me-2' />Add to Compare</a>
                      </div>
                      <div>
                        <a href='/'><AiOutlineHeart className='fs-5 me-2' /> Add to Wishlist</a>
                      </div>
                    </div>
                    <div className='d-flex gap-10 flex-column my-3'>
                      <h3 className='product-heading'>Shipping & Returns: </h3>
                      <p className='product-data'>
                        Free shipping and returns avaiable on all orders!<br /> We ship all US domestic orders within <b>5-10 business days!</b>
                      </p>
                    </div>
                    <div className='d-flex gap-10 align-items-center my-3'>
                      <h3 className='product-heading'>Product Link: </h3>
                      <a href='javascript:void(0);' onClick={() => copyToClipboard("https://topstore.vn/uploads/untitled_1694175269.png")}>Copy Product Link</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container class1='description-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              <div className='col-12'>
                <h4>Description</h4>
                <div className='bg-white p-3'>
                  <p
                    dangerouslySetInnerHTML={{ __html: productState?.description }}
                  ></p>
                </div>
              </div>
            </div>
          </Container>
          <Container class1='reviews-wrapper home-wrapper-2'>
            <div className='row'>
              <div className='col-12'>
                <h3 id='review' >Reviews</h3>
                <div className='review-inner-wrapper'>
                  <div className='review-head d-flex justify-content-between align-items-end'>
                    <div>
                      <h4 className='mb-2'>Customer Reviews</h4>
                      <div className='d-flex gap-10 align-items-center'>
                        <ReactStars
                          count={5}
                          size={24}
                          value="3"
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className='mb-0'>Based on 2 Reviews</p>
                      </div>
                    </div>
                    {
                      orderedProduct && (<div>
                        <a className='text-dark text-decoration-underline' href='/'>Write a Review</a>
                      </div>)
                    }
                  </div>
                  <div className='review-form py-4'>
                    <h4>Write a Review</h4>
                    <form action='' className='d-flex flex-column gap-15'>
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value="3"
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div>
                        <textarea name='' id='' rows="3" cols="30" className='w-100 form-control' placeholder='Comments' />
                      </div>
                      <div className='d-flex justify-content-end'>
                        <button className='button border-0'>Submit Review</button>
                      </div>
                    </form>
                  </div>
                  <div className='reviews mt-4'>
                    <div className='review'>
                      <div className='d-flex gap-10 align-items-center'>
                        <h6 className='mb-0'>Navdeep</h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value="3"
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et placerat sem. Aliquam euismod tincidunt risus, eu consectetur enim congue non. Nunc et velit non magna facilisis congue sed a enim. Maecenas interdum ex eget nunc consectetur, et placerat risus consectetur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container class1='popular-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'>Our Popular Products</h3>
              </div>
            </div>
            <div className='row'>
              <ProductCard />
            </div>
          </Container>
        </>
      }

    </>
  )
}

export default SingleProduct