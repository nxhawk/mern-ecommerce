import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    { type: 'Jan', value: 0.16 },
    { type: 'Feb', value: 0.125 },
    { type: 'Mar', value: 0.24 },
    { type: 'Apr', value: 0.19 },
    { type: 'May', value: 0.22 },
    { type: 'Jun', value: 0.05 },
    { type: 'July', value: 0.01 },
    { type: 'Aug', value: 0.015 },
    { type: 'Sept', value: 0.015 },
    { type: 'Oct', value: 0.015 },
    { type: 'Nov', value: 0.015 },
    { type: 'Dec', value: 0.015 },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        if (type === '10-30分' || type === '30+分') {
          return '#22CBCC';
        }
        return '#ffd333';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex align-items-center justify-content-between flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight /> 32%</h6>
            <p className='mb-0 desc'>Compared To April 2023</p>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'><BsArrowDownRight />32%</h6>
            <p className='mb-0 desc'>Compared To April 2023</p>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight />32%</h6>
            <p className='mb-0 desc'>Compared To April 2023</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4 title'>Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4 title'>
          Recent Orders
        </h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard