import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import BlogCard from '../components/BlogCard'
import ProductCard from '../components/ProductCard'
import SpecialProduct from '../components/SpecialProduct'
import Container from '../components/Container'
import { services } from '../utils/Data'
import banner1 from '../images/main-banner-1.jpg'
import catbanner01 from '../images/catbanner-01.jpg'
import catbanner02 from '../images/catbanner-02.jpg'
import catbanner03 from '../images/catbanner-03.jpg'
import catbanner04 from '../images/catbanner-04.jpg'
import camera from '../images/camera.jpg'
import tv from '../images/tv.jpg'
import headphone from '../images/headphone.jpg'
import laptop from '../images/laptop.jpg'

import brand1 from '../images/brand-01.png'
import brand2 from '../images/brand-02.png'
import brand3 from '../images/brand-03.png'
import brand4 from '../images/brand-04.png'
import brand5 from '../images/brand-05.png'
import brand6 from '../images/brand-06.png'
import brand7 from '../images/brand-07.png'
import brand8 from '../images/brand-08.png'

import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from '../features/blogs/blogSlice'
import moment from 'moment'
import { getAllProducts } from '../features/products/productSlice'


import productcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import watch2 from '../images/speaker.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { addToWishlist } from '../features/products/productSlice'
import ReactStars from 'react-rating-stars-component'

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog)
  const productState = useSelector((state) => state?.product?.product)

  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
    getProducts();
  }, [])
  const addtoWishlist = (id) => {
    dispatch(addToWishlist(id))
  }

  const getBlogs = () => {
    dispatch(getAllBlogs());
  }

  const getProducts = () => {
    dispatch(getAllProducts());
  }
  return (
    <>
      <Container class1='home-wrapper-1 py-5'>
        <div className='row'>
          <div className='col-6'>
            <div className='main-banner position-relative'>
              <img src={banner1} alt='main banner' className='img-fluid rounded-3' />
              <div className='main-banner-content position-absolute'>
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className='button'>BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex flex-wrap gap-10 justify-content-between align-items-center'>
              <div className='small-banner position-relative'>
                <img src={catbanner01} alt='main banner' className='img-fluid rounded-3' />
                <div className='small-banner-content position-absolute'>
                  <h4>BEST SAKE</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src={catbanner02} alt='main banner' className='img-fluid rounded-3' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src={catbanner03} alt='main banner' className='img-fluid rounded-3' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src={catbanner04} alt='main banner' className='img-fluid rounded-3' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='services d-flex align-items-center justify-content-between'>
              {
                services?.map((i, j) => {
                  return (
                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt='services' />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='categories d-flex justify-content-between align-items-center flex-wrap'>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt='tv' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt='tv' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt='camera' />
              </div>

            </div>
          </div>
        </div>
      </Container>
      <Container class1='featured-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Featured Collection</h3>
          </div>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'featured')
                return (
                  <div key={index} className='col-3'>
                    <Link
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

                        <p className='price'>$ {item?.price}</p>
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
                )
            })
          }
        </div>
      </Container>
      <Container class1='famous-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src={laptop} className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src={laptop} className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Studio Display</h5>
                <h6>600 nits of brightness.</h6>
                <p>27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src={laptop} className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Smartphones</h5>
                <h6>Smartphone 13 Pro.</h6>
                <p>Now in Green. From $999.00 or $41.62/mo. for 24 month</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src={laptop} className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>home speakers</h5>
                <h6>Room-filling sound.</h6>
                <p>From $699 or $116.58/mo. for 12 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='special-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Special Products</h3>
          </div>
        </div>
        <div className='row'>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'special')
                return (
                  <SpecialProduct key={index}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    image={item?.images[0]?.url}
                  />
                )
            })
          }
        </div>
      </Container>
      <Container class1='popular-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Our Popular Products</h3>
          </div>
        </div>
        <div className='row'>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'popular')
                return (
                  <div key={index} className='col-3'>
                    <Link
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

                        <p className='price'>$ {item?.price}</p>
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
                )
            })
          }
        </div>
      </Container>
      <Container class1='marquee-wrapper py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='marquee-inner-wrapper card-wrapper'>
              <Marquee className='d-flex'>
                <div className='mx-4 w-25'>
                  <img src={brand1} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand2} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand3} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand4} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand5} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand6} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand7} alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand8} alt='brand' />
                </div>

              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='blog-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Our Latest Blogs</h3>
          </div>
        </div>
        <div className='row'>
          {blogState && blogState?.map((item, index) => {
            if (index < 3)
              return (
                <div key={index} className='col-3'>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
                    description={item?.description}
                    image={item?.images[0]?.url}
                    date={moment(item?.createdAt).format("MMM Do YYYY, h:mm a")}
                  />
                </div>
              )
          })}
        </div>
      </Container>
    </>
  )
}

export default Home