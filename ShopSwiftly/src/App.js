import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Products from './Pages/Products'
import About from './Pages/About'
import BlogPage from './Pages/BlogPage';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import CartPage from './Pages/Cart'
import MyOrders from './Pages/MyOrders';
import Singlepageproduct from './Pages/Signleproduct'
import AdminHome from './Admin/Pages/AdminHome';
import Admindashboard from './Admin/Pages/AdminDashboard'
import Addpro from './Admin/Pages/Addproduct'
import Addcategory from './Admin/Pages/Addcategory';
import Adminod from './Admin/Pages/Orders'


function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="product" element={<Products />} />
    <Route path="about" element={<About />} />
    <Route path="blog" element={<BlogPage />} />
    <Route path="c" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="cart" element={<CartPage/>}/>
    <Route path="myorders" element={<MyOrders/>}/>
    <Route path="products" element={<Singlepageproduct/>}/>


    {/* Admin routes */}

    <Route path='adminhome' element={<AdminHome/>}/>
    <Route path='admindash' element={<Admindashboard/>}/>
    <Route path='adminaddpro' element={<Addpro/>}/>
    <Route path='adminaddcat' element={<Addcategory/>}/>
    <Route path='adminorder' element={<Adminod/>}/>



 </Routes>



  )
}

export default App