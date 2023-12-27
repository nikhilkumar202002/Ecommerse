import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import cart from "../Icons/cart.svg"

import profile from "../Icons/account.svg"
import menuIcon from "../Icons/menu.svg"
import { UserContext } from '../Static/UserContext'
import ProfilePic from '../Images/elssie.jpg'
import Axios from '../Static/Axios'
import DownArrow from '../Icons/down-arrow.svg'
import CloseMenu from '../Icons/close.png'

function Navbar() {
    const { user, setUser } = useContext(UserContext)
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    console.log(user, "from nav")
    const logout = () => {
        localStorage.removeItem("Auth_info");
        setUser(null)
    }


    const fetchCategories = async () => {
        try {
            Axios.get('/getCategory').then((response) => {
                console.log(response.data, "Categories")
                setCategories(response.data)
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const getCategorySingle = async (category) => {
        try {
            console.log(category, "hello category single");
            navigate(`/categorysinglepage/${category}`);
        }
        catch (error) {
            console.log(error)
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <div className='Nav'>
                <div className='leftNav'>
                    <div className='Logo'>
                        <Link to={'/'}><p>ShopSwiftly.</p></Link>
                    </div>
                </div>

                <div className='rightNav'>
                    <div className='navCart'>
                        {
                            user ?
                                <button>
                                    <Link to='/cart'>
                                        <img src={cart} alt="" /><sup><div className='cart_counter'><p>{user ? user.cartTotal : 0}</p></div></sup>
                                    </Link>
                                </button>
                                :
                                ""
                        }
                    </div>
                    <div className='Profile'>
                        {
                            user ?

                                <button className='user_profile'><img src={ProfilePic} alt="" />{user.user.UserName} <span><img src={DownArrow} alt="" /></span></button>
                                :
                                <button><img src={profile} alt="" /></button>
                        }
                        <div className='profileDropdown'>
                            {
                                user ?
                                    <>
                                        <div className='profile-list-items'><Link>Settings</Link></div>
                                        <div className='profile-list-items'><Link>Account</Link></div>
                                        <div className='profile-list-items'><Link onClick={() => logout()}>Logout</Link></div>
                                    </>
                                        
                                    
                                    :
                                    <>
                                        <div className='profile-list-items'><Link to="/signin">Sign In</Link></div>
                                        <div className='profile-list-items'><Link to="/signup">Sign Up</Link></div>
                                    </>
                                        
                                    
                            }

                        </div>
                    </div>

                    <div className='Hamburger'>
                        <div className='hamburger-button'>
                            <button onClick={toggleMenu}><img src={menuIcon} alt="" /></button>
                        </div>
                    </div>
                    {
                        isOpen ?
                            <div className='menu-navbar'>
                                <div className='nav-list'>
                                    <div className='nav-list-items' style={{ float: 'right' }}>
                                        <button onClick={toggleMenu}><img src={CloseMenu} alt="" /></button>
                                    </div>
                                    <div className='nav-list-items'>
                                        <Link to="/">Home</Link>
                                    </div>
                                    <div className='nav-list-items'>
                                        <div className='dropDown'>
                                            <Link>Category</Link>
                                            <div className='dropDownlist'>
                                                <div className='dropDownlist-items'>
                                                    {categories.map((category) => (
                                                        <div className='drop-Down-items' onClick={() => getCategorySingle(category.name)}>{category.name}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='nav-list-items'>
                                        <Link to="/product">Products</Link>
                                    </div>
                                    <div className='nav-list-items'>
                                        <Link to="/about">About Us</Link>
                                    </div>
                                    <div className='nav-list-items'>
                                        <Link to="/blog">Blog</Link>
                                    </div>
                                    {user ? <div className='nav-list-items'>
                                        <Link to='/myorders'>My Orders</Link>
                                    </div> : ""}
                                    <div className='nav-list-items'>
                                        <Link to="/cart">Cart</Link>
                                    </div>
                                    <div className='nav-list-items'>
                                        <Link to="/blog">Profile</Link>
                                    </div>
                                    
                                    
                                    
                                </div>
                            </div>

                            : ""
                    }


                </div>

            </div>


        </>
    )
}

export default Navbar