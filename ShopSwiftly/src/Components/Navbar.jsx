import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import cart from "../Icons/cart.svg"
import logo from "../Icons/logo.svg"
import profile from "../Icons/account.svg"
import menuIcon from "../Icons/menu.svg"
import { UserContext } from '../Static/UserContext'
import ProfilePic from '../Images/elssie.jpg'
import Axios from '../Static/Axios'




function Navbar() {
    const {user,setUser} = useContext(UserContext)
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    console.log(user,"from nav")
    const logout = ()=>{
        localStorage.removeItem("Auth_info");
        setUser(null)
    }
    

    const fetchCategories = async () => {
        try {
           Axios.get('/getCategory').then((response)=>{
            console.log(response.data,"hello")
            setCategories(response.data)
           })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const getCategorySingle = async(category)=>{
        try {
            console.log(category,"hello category single");
            let data = {
                category
            }
            Axios.post('/get-product-cat',data).then((response)=>{
                console.log(response.data,"hello cat") 
                const 
                _id = response.data.id;
                navigate(`/category/${_id}`);
            
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
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
                                <div className='dropDownlist-items'>
                                {categories.map((category) => (
                                <Link onClick={()=>getCategorySingle(category.name)}>{category.name}</Link>
                                ))}
                             </div>
                            
                            </div>
                            </div></li>

                            <li><Link to="/product">Products</Link></li>
                            <li> <Link to="/about">About Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            { user ?  <li><Link to='/myorders'>My Orders</Link></li> : ""}
                           
                            <li>  <div className='searchBar'>
                    <input type="search" name="" id="" placeholder='Search Products...'/>
                    <button>Search</button>
                </div></li>
                    </ul>
                </div>
            </div>

            <div className='rightNav'>
                <div className='navCart'> 
                    {
                        user ? 
                    <button>
                        <Link to='/cart'>
                             <img src={cart} alt=""/><sup><div className='cart_counter'><p>{user ? user.cartTotal : 0}</p></div></sup>
                        </Link>
                    </button>
                        : 
                        ""
                    }
                </div>
                <div className='Profile'>
                    {
                        user ? 

                                <button className='user_profile'><img src={ProfilePic} alt=""/>{user.user.UserName}</button>
                        :
                                <button><img src={profile} alt="" /></button>
                    }
                    <div className='profileDropdown'>
                        {
                            user ?
                         <ul>
                            <li><Link  onClick={()=>logout()}>Logout</Link></li>
                        </ul>
                         :
                        <ul>
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </ul>
                        }
                        
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