import React, { useRef } from 'react'
import './Addproduct.css'
import Axios from '../../Static/Axios'
export default function Addproduct() {

    const productRef = useRef(null);
    const priceRef = useRef(null);
    const offerpriceRef = useRef(null);
    const descriptionRef = useRef(null);
    const productimageRef = useRef(null)
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        const ProductName = productRef.current.value;
        const Price = priceRef.current.value;
        const OfferPrice = offerpriceRef.current.value;
        const Description = descriptionRef.current.value;
        const ProductImage = productimageRef.current.files[0];
        console.log("Product Name: ", ProductName);
        console.log("Price: ", Price);
        console.log("Offer Price: ", OfferPrice);
        console.log("Description: ", Description);
        console.log("Product Image: ", ProductImage);
        const formData = new FormData();
                formData.append('name', ProductName);
                formData.append('price', Price);
                formData.append('offer_price', OfferPrice);
                formData.append('description', Description);
                formData.append('image', ProductImage);
                console.log(formData)
     
        try {
            Axios.post('/admin/add-product',formData).then((response)=>{
                console.log(response.date);
            })
        } catch (error) {
            console.log(error)
        }

        

    }
  return (
        <>
            <section className='add_pro'>
                <div className='add_pro_heading'>
                <h1>Add Product</h1>
                    <p></p>
                </div>
                <div className='Add_pro_form'>
                    <form onSubmit={handleSubmit} method="post">
                        <input type="text" placeholder='Enter Product Name' ref={productRef}/><br/><br/>
                        <input type="number" placeholder='Enter Product Price' ref={priceRef}/><br/><br/>
                        <input type="number" placeholder='Enter Product Offer Price' ref={offerpriceRef}/><br/><br/>
                        <input type="description" placeholder='Enter Product Description' ref={descriptionRef}/><br/> <br />
                        <select name="" id="">
                            <option value="">Select Category</option>
                        </select>
                        <br /> <br />
                        <input type="file"  ref={productimageRef}/><br />
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </section>
        </>
  )
}
