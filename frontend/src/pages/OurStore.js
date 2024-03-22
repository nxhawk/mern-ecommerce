import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from 'react-rating-stars-component'
import ProductCard from '../components/ProductCard'
import Color from '../components/Color'
import watch from '../images/watch.jpg'
import gr4 from '../images/gr4.svg'
import gr3 from '../images/gr3.svg'
import gr2 from '../images/gr2.svg'
import gr from '../images/gr.svg'
import Container from '../components/Container'

import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from '../features/products/productSlice'

const OurStore = () => {
  const [grid, setGrid] = useState(4)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const productState = useSelector((state) => state.product.product)

  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [tag, setTag] = useState(null)
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort, setSort] = useState(null)

  useEffect(() => {
    let newBrands = []
    let category = []
    let newTags = []
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      newBrands.push(element.brand)
      category.push(element.category)
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState])

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice])
  const getProducts = () => {
    dispatch(getAllProducts({
      sort,
      tag,
      brand,
      category,
      minPrice,
      maxPrice
    }));
  }


  return (
    <>
      <Meta title='Our Store' />
      <BreadCrumb title='Our Store' />
      <Container class1='store-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Shop By Categories</h3>
              <div>
                <ul className='ps-0'>
                  {
                    categories && [...new Set(categories)].map((item, index) => {
                      return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Filter By</h3>
              <div>

                <h5 className='sub-title'>Price</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput" placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                      value={minPrice}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput1" placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                      value={maxPrice}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>

              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Product Tags</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  {
                    tags && [...new Set(tags)].map((item, index) => {
                      return <span key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize'
                        onClick={() => setTag(item)}
                      >{item}</span>
                    })
                  }

                </div>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Product Brands</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  {
                    brands && [...new Set(brands)].map((item, index) => {
                      return <span key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize'
                        onClick={() => setBrand(item)}
                      >{item}</span>
                    })
                  }

                </div>
              </div>
            </div>
          </div>
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                  <p className='mb-0 d-block' style={{ "width": "100px" }}>Sort By: </p>
                  <select
                    defaultValue={"manual"}
                    name='sort_by' className='form-control form-select' id='SortBy'
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0'>21 Products</p>
                  <div className='d-flex gap-10 align-items-center grid'>
                    <img onClick={() => { setGrid(3) }}
                      src={gr4} alt='grid' className='d-block img-fluid' />
                    <img onClick={() => { setGrid(4) }}
                      src={gr3} alt='grid' className='d-block img-fluid' />
                    <img onClick={() => { setGrid(6) }}
                      src={gr2} alt='grid' className='d-block img-fluid' />
                    <img onClick={() => { setGrid(12) }}
                      src={gr} alt='grid' className='d-block img-fluid' />
                  </div>
                </div>
              </div>
            </div>
            <div className='products-list pb-5'>
              <div className='d-flex gap-10 flex-wrap'>
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default OurStore