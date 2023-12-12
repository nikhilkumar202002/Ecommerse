import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link, useParams } from 'react-router-dom';
import Axios from '../Static/Axios'
import Typography from '@mui/material/Typography';
import './CategoriesSingle.css'
import { ImgUrl } from '../Static/ImagUrl'

function CategoriesSingle() {
    const id  = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        let category = {
          id
        }
        try {
            Axios.post('/get-product-cat',category).then((response)=>{
            console.log(response.data,"hello category");
            setCategoryProducts(response.data)
          })
        } catch (error) {
          console.log(error)
        }
      }, []);
    


  return (
    <>
        <div className='category-single-page'>
            <h1></h1>
        </div>
         
    <div className='category-single-cards'>
      {
        categoryProducts.map((products) =>(
          <Card className='pro-card' key={products.id} sx={{ maxWidth: 345 }}>
          <CardMedia className='pro-image'
            component="img"
            alt="green iguana"
            height="250"
            image={  ImgUrl + '/' + products._id+'.jpg'}
          />
          <CardContent>
            <Typography className='pro-name' gutterBottom variant="h5" component="div">{products.name}</Typography>
            <Typography className="pro-description" variant="body2" color="text.secondary">
            {products.description}
            </Typography>
            <Typography className='category-price'><p>{products.price}<span><s>{products.offer_price}</s></span></p></Typography>
          </CardContent>
          <CardActions>
           <div className='category-btn'>
            <div className='category-btns'><button>Buy Now</button></div>
            <div className='category-btns'><button>Add to Cart</button></div>
           </div>
          </CardActions>
        </Card>
        ))
      }
      
        </div>
         
  
        
    </>
  )
}

export default CategoriesSingle