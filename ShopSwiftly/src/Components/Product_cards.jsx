import React, { useEffect, useState } from 'react'
import Review_star from '../Icons/star.svg'
import './Product_cards.css'
import Axios from '../Static/Axios'
function Product_cards() {
    const [product, setproduct] = useState([])
    useEffect(() => {
            try {
                    Axios.get('/products').then((response)=>{
                            console.log(response)
                            setproduct(response.data)
                    })
            } catch (error) {
                
            }
    }, [])
    
  return (
    <>
        <div className="product_card_heading">
            <h1>Products</h1>
        </div>

        <div className='product_cards'>

            {
                product.map((obj)=>{
                    return(
                        <>
            <div className='product_card'>
                <div className='product_card_top'>
                    <img src={obj ? obj.image :""} alt="" />
                </div>

                <div className='product_card_details'>
                    <div className='product_name'>
                        <p>{obj ? obj.title :""}</p>
                    </div>
                    <div className='product_review'>
                        <p>4.5/5 <span><img src={Review_star} alt="" /></span></p>
                    </div>
                    <div className='product_description'>
                        <p>{obj ? obj.description : ""}</p>
                    </div>
                    <div className='product_price'>
                        <p>${obj ? obj.price :""}<span><s>${obj ? obj.price :""}</s></span></p>
                    </div>
                    <div className='product_cart_buy'>
                        <div className='product_addtocart'>
                            <button>Add to Cart</button>
                        </div>
                        <div className='product_buynow'>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
                        </>
                    )
                })
            }

        </div>
    </>
  )
}

export default Product_cards