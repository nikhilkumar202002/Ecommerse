import React from 'react'
import './Addproduct.css'

export default function Addproduct() {
  return (
        <>
            <section className='add_pro'>
                <div className='add_pro_heading'>
                <h1>Add Product</h1>
                    <p></p>
                </div>
                <div className='Add_pro_form'>
                    <form action="" method="post">
                        <input type="text" placeholder='Enter Product Name'/><br/><br/>
                        <input type="number" placeholder='Enter Product Price'/><br/><br/>
                        <input type="number" placeholder='Enter Product Offer Price'/><br/><br/>
                        <input type="description" placeholder='Enter Product Description'/><br/> <br />
                        <select name="" id="">
                            <option value="">Select Category</option>
                        </select>
                        <br /> <br />
                        <input type="file" /><br />
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </section>
        </>
  )
}
