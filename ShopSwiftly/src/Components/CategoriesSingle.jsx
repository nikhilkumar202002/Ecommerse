import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link, useParams } from 'react-router-dom';
import Axios from '../Static/Axios'
import Typography from '@mui/material/Typography';
import './CategoriesSingle.css'

function CategoriesSingle() {
    const { id } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = () => {
          try {
            Axios.get(`/get-product-cat/${id}`).then((response)=>{
                console.log(response.data,"category single page")
                setCategoryProducts(response.data);
            });
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchCategoryProducts();
      }, [id]);
    


  return (
    <>
        <div className='category-single-page'>
            <h1></h1>
        </div>
        <div className='category-single-cards'>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">Lizard</Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Typography className='category-price'><p>12500<span><s>11500</s></span></p></Typography>
      </CardContent>
      <CardActions>
       <div className='category-btn'>
        <div className='category-btns'><button>Buy Now</button></div>
        <div className='category-btns'><button>Add to Cart</button></div>
       </div>
      </CardActions>
    </Card>
        </div>
        
    </>
  )
}

export default CategoriesSingle