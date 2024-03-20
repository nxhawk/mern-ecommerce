import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs';
import compare from '../images/compare.svg'
import wishlist from '../images/wishlist.svg'
import user from '../images/user.svg'
import cart from '../images/cart.svg'
import menu from '../images/menu.svg'

import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);
  const cartState = useSelector((state) => state?.auth?.cartProducts)

  const [total, setTotal] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotal(sum);
  }, [cartState])

  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>Free Shipping Over $100 & Free Returns</p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0'>Hotline: <a className='text-white' href='tel:+91 8264954234'>+91 8264954234</a></p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h3>
                <Link className='text-white'>Dev Corner</Link>
              </h3>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2" />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                    <img src={compare} alt='compare' />
                    <p className='mb-0'>Compare<br /> Products</p>
                  </Link>
                </div>
                <div>
                  <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                    <img src={wishlist} alt='wishlist' />
                    <p className='mb-0'>Favourite<br /> wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null ? '/login' : ' '} className='d-flex align-items-center gap-10 text-white'>
                    <img src={user} alt='user' />
                    {
                      authState?.user === null ? (
                        <p className='mb-0'>Log in<br /> My Account</p>
                      ) :
                        (
                          <p className='mb-0'>
                            Welcome <br /> {`${authState?.user?.firstname} ${authState?.user?.lastname}`}
                          </p>
                        )
                    }
                  </Link>
                </div>
                <div>
                  <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                    <img src={cart} alt='cart' />
                    <div className='d-flex flex-column gap-10'>
                      <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                      <p className='mb-0'>$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={menu} alt='menu' />
                    <span className='me-5 d-inline-block'>
                      Shop Categories
                    </span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                    <li><Link className="dropdown-item text-white" to="#">Another action</Link></li>
                    <li><Link className="dropdown-item text-white" to="#">Something else here</Link></li>
                  </ul>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink className="" to='/'>Home</NavLink>
                    <NavLink className="" to='/product'>Our Store</NavLink>
                    <NavLink className="" to='/my-orders'>My Orders</NavLink>
                    <NavLink className="" to='/blogs'>Blogs</NavLink>
                    <NavLink className="" to='/contact'>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header