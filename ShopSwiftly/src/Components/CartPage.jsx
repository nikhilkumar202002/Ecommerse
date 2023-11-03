import React from 'react'
import './CartPage.css'
import Product1 from '../Images/product 1.jpg'
function CartPage() {
  return (
    <>
            <div className='cart_heading'>'
                <h1>My Cart</h1>
            </div>

            <section className='cart_hero'>
                <div className='cart_item'>
                <div className='cart_items'>
                    <div className='cart_products'>
                        <div className='cart_product_img'>
                            <img src={Product1} alt="" />
                        </div>
                        <div className='cart_product_details'>
                            <p><b>Name</b></p>
                            <p>$40</p>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='cart_product_counter'>
                        <button>-</button>
                        <input type="number" value="0"/>
                        <button>+</button>
                    </div>
                </div>

                <div className='cart_items'>
                    <div className='cart_products'>
                        <div className='cart_product_img'>
                            <img src={Product1} alt="" />
                        </div>
                        <div className='cart_product_details'>
                            <p><b>Name</b></p>
                            <p>$40</p>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='cart_product_counter'>
                        <button>-</button>
                        <input type="number" value="0"/>
                        <button>+</button>
                    </div>
                </div>

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