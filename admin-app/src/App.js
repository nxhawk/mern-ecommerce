import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import AddblogCat from './pages/AddblogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<Resetpassword />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/admin' element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='enquiries' element={<Enquiries />} />
            <Route path='blog-list' element={<Bloglist />} />
            <Route path='blog' element={<Addblog />} />
            <Route path='coupon-list' element={<Couponlist />} />
            <Route path='coupon' element={<AddCoupon />} />
            <Route path='blog-category-list' element={<Blogcatlist />} />
            <Route path='blog-category' element={<AddblogCat />} />
            <Route path='blog-category/:id' element={<AddblogCat />} />
            <Route path='orders' element={<Orders />} />
            <Route path='customers' element={<Customers />} />
            <Route path='list-color' element={<Colorlist />} />
            <Route path='color' element={<AddColor />} />
            <Route path='list-category' element={<Categorylist />} />
            <Route path='category' element={<AddCat />} />
            <Route path='category/:id' element={<AddCat />} />
            <Route path='list-brand' element={<Brandlist />} />
            <Route path='brand' element={<AddBrand />} />
            <Route path='brand/:id' element={<AddBrand />} />
            <Route path='list-product' element={<Productlist />} />
            <Route path='product' element={<AddProduct />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
