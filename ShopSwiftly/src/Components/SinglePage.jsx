import React, { useEffect, useState } from 'react'
import './SinglePage.css'
import S23black from "../Images/s23black.jpg"
import S23lavender from "../Images/s23lavender.jpg"
import S23green from "../Images/s23green.jpg"
import Axios from '../Static/Axios'
import { ImgUrl } from '../Static/ImagUrl'
    
function SinglePage(prop) {
            const [product, setProduct] = useState([])
    useEffect(() => {
       let  id = prop.id;
        let data = {
                id
        }
            try {
                Axios.post('/get-Single-Product',data).then((response)=>{
                            console.log(response.data,"single produte here")
                                setProduct(response.data)
                })
            } catch (error) {
                
            }
    }, [])
    
        
  return (
    <>
        <section className='single_page_product'>
           
            <div className='single_product'>
                <div className='single_product_images'>
                <img src={  ImgUrl + '/' + product._id+'.jpg'} alt="" />
                </div>
                <div className='single_product_details'>
                    <div className='product_category'>
                        <p>Mens | Shoes</p>
                    </div>
                    <div className='product1_name'>
                        <p>{product.name}</p>
                    </div>
                    <div className='product1_description'>
                        <p>{product.description}</p>
                    </div>
                    <div className='product1_price'>
                        <p>₹{product.offer_price}<span><s>₹{product.price}</s></span></p>
                        <p><span id='product_tax'>(Inclusive of all taxes)</span></p>
                    </div>
                    <div className='avail_color'>
                        <p>Available Colors</p>
                        <div className='type_colors'>
                        <div className='colors'>
                            <img src={S23black} alt="" />
                        </div>
                        <div className='colors'>
                            <img src={S23lavender} alt="" />
                        </div>
                        <div className='colors'>
                            <img src={S23green} alt="" />
                        </div>
                        </div>
                    </div>
                    <div className='details_btn'>
                        <button type="submit">Buy Now</button>
                        <button >Add To Cart</button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default SinglePage