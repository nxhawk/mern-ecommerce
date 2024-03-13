import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from 'react-icons/ai';
import { getBlogCategories } from '../features/bcategory/bcategorySlice';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Blogcatlist = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlogCategories());
  }, [])
  const bCategoryState = useSelector((state) => state.bCategory.bCategories)
  const data1 = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCategoryState[i].title,
      action: (
        <>
          <Link to='/' className='fs-3 text-danger'>
            <BiEdit />
          </Link>
          <Link to='/' className='ms-3 fs-3 text-danger'>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className='mb-4 title'>Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Blogcatlist