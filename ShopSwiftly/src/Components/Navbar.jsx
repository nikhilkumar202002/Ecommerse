import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import cart from "../Icons/cart.svg"
import logo from "../Icons/logo.svg"
import profile from "../Icons/account.svg"
import menuIcon from "../Icons/menu.svg"


function Navbar() {
  return (
    <>
        <div className='Nav'>
            <div className='leftNav'>
                <div className='Logo'>
                     <img src={logo} alt="" />
                </div>
                <div className='navList'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><div className='dropDown'>
                            <button>Category</button>
                            <div className='dropDownlist'>
                                <ul>
                                    <li>Electronics</li>
                                    <li>Men's Fashion</li>
                                    <li>Ladies Fasion</li>
                                    <li>Laptops</li>
                                    <li>Sports & Outdoors</li>
                                    <li>Books</li>
                                    <li>Health & Beauty</li>
                                    <li>Furniture</li>
                                    <li>Kitchen Essentials</li>
                                </ul>
                            </div>
                            </div></li>

                            <li><Link to="/product">Products</Link></li>
                            <li> <Link to="/about">About Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to='/myorders'>My Orders</Link></li>
                            <li>  <div className='searchBar'>
                    <input type="search" name="" id="" placeholder='Search Products...'/>
                    <button>Search</button>
                </div></li>
                    </ul>
                </div>
            </div>

            <div className='rightNav'>
                <div className='navCart'>
                    <button><img src={cart} alt=""/></button>
                </div>
                <div className='Profile'>
                    <button><img src={profile} alt="" /></button>
                    <div className='profileDropdown'>
                        <ul>
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>

                <div className='Hamburger'>
                    <img src={menuIcon} alt="" />
                </div>
            </div>
          
        </div>
    </>
  )
}

export default Navbar