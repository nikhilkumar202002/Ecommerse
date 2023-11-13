import React, { useEffect ,useContext, useState} from 'react'
import './CartPage.css'
import Product1 from '../Images/product 1.jpg'
import Axios from '../Static/Axios'
import { UserContext } from '../Static/UserContext'
import { json } from 'react-router'
import ImageUrl from '../Static/ImageUrl'

function CartPage() {
        const {user,setUser} = useContext(UserContext)
        const [cartItems, setCartitems] = useState([])
        useEffect(() => {
            try {

                    let userData = JSON.parse(localStorage.getItem('Auth_info'))
                        userData = userData.user;
                     console.log(userData,"Userid from cart from auth info")
                        Axios.post('/getCartItem',userData).then((response)=>{
                        console.log(response.data,"cartData")
                        setCartitems(response.data.product)
                })
            } catch (error) {
                console.log(error)
            }
        }, [])
        
  return (
    <>
            <div className='cart_heading'>'
                <h1>My Cart</h1>
            </div>

            <section className='cart_hero'>
                <div className='cart_item'>
                    {
                            cartItems.map((item)=>{
                                    return (
                                        <>
                                        <div className='cart_items'>
                                                <div className='cart_products'>
                                                    <div className='cart_product_img'>
                                                        <img src={  ImageUrl + item._id+'.jpg'} alt="" />
                                                    </div>
                                                    <div className='cart_product_details'>
                                                        <p><b>{item.name}</b></p>
                                                        <p>{item.offer_price}</p>
                                                        <button>Remove</button>
                                                </div>
                                            </div>
                                                <div className='cart_product_counter'>
                                                    <button>-</button>
                                                    <input type="number" value="0"/>
                                                    <button>+</button>
                                                </div>
                                        </div>
                                        </>
                                    )
                            })

                    }


               

                </div>
                <div className='cart_total'>
                    <div className='cart_total_table'>
                        <table>

                            <tr>
                                <th>Your Order</th>
                            </tr>

                            <tr>
                                <td>Sub-Total</td>
                                <td>$200</td>
                            </tr>

                            <tr>
                                <td>Delivery_charge</td>
                                <td>$30</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th>$230</th>
                            </tr>

                        </table>

                    </div>
                    <div className='cart_checkout_btn'>
                            <button>Checkout</button>
                        </div>
                </div>
            </section>
    </>
  )
}

export default CartPage