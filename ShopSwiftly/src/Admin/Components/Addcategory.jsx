import React, { useRef, useState } from 'react'
import './Addcategory.css'
import Axios from '../../Static/Axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Addcategory() {
    
    const [categoryStatus, setcategoryStatus] = useState(false)
    const catergoryRef = useRef(null);

    const handleSubmit = (event) =>{
        event.preventDefault();

        const CategoryName = catergoryRef.current.value;
        console.log("categoryName :",CategoryName);

        const formData = new FormData();
                formData.append('name', CategoryName);
                console.log(formData,"hello")

        try {
            Axios.post('/admin/add-category',formData).then((response)=>{
                console.log(response.data);
                setcategoryStatus(response.data)
                if(response.data){
                    const myTimeout = setTimeout(changeStatus, 2000);
                    console.log("calling");
                }
                function changeStatus(){
                    console.log(categoryStatus)
                    console.log("called")
                    setcategoryStatus(false)
                    catergoryRef.current.value = ""
                    
                }

            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <section className='add_cat'>
        <div className='add_cat_heading'>
        <h1>Add Category</h1>
            <p></p>
        </div>
        <div className='Add_cat_form'>
            <form onSubmit={handleSubmit} method="post">
                <input type="text" placeholder='Enter Category Name' ref={catergoryRef}/><br/><br/>
                <input type="file" /><br />
                <button type="submit">Add Product</button>

               
            </form>
            {
                            categoryStatus ?
                            <div className='alert-category'> 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Category Added Succesfully</Alert>
                        </Stack>
                        </div>
                        : ""
                        }
        </div>
    </section>
</>
  )
}

export default Addcategory