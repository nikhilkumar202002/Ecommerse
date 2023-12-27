import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import './HomeCards.css'
import Axios from '../Static/Axios'
import { UserContext } from '../Static/UserContext'
import { Navigate } from 'react-router'
import { ImgUrl } from '../Static/ImagUrl'
import { Link } from 'react-router-dom'
import Star from '../Icons/star.svg'



function HomeCards() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const [product, setproduct] = useState([])
    useEffect(() => {

        try {
            Axios.get('/Admin/allproducts').then((response) => {
                console.log(response)
                setproduct(response.data)
            })
        } catch (error) {

        }
    }, [])

    const addtoCart = (obj) => {
        console.log(obj)
        console.log(user.user._id, "user")
        let userId = user.user._id
        let data = {
            obj,
            userId
        }
        try {
            Axios.post('/AddToCart', data).then((response) => {
                console.log(response.data)
                navigate('/cart');

            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleViewMoreClick = () => {
        // Replace '/your-new-route' with the URL you want to navigate to
        window.location.href = '/product';
      };

      useEffect(() => {
        const handleScroll = () => {
          const cards = document.querySelectorAll('.homeCard');
          cards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
    
            if (cardTop < windowHeight && cardBottom >= 0) {
              card.classList.add('animate');
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <>



            <div className='homecardheading'>
                <h1><span style={{fontSize:"40px",color:"#FD7B2B"}}>O</span>ur Products</h1>
            </div>
            <div className='hero-container'>
            <div className='homeCards'>
                <div className='homepageCards'>
                    {
                        product.map((obj) => {
                            return (
                                <>
                                    <div className='homeCard'>
                                        <div className='homeCardimage'>
                                            <Link to={`/products/${obj._id}`}>
                                                <img src={ImgUrl + '/' + obj._id + '.jpg'} alt="" />
                                            </Link>

                                        </div>
                                        <div className='homeCarddetails'>
                                            <div className='pname'>
                                                <p><b>{obj ? obj.name : ""}</b></p>
                                            </div>
                                            <div className='card-description'>
                                                <p>{obj ? obj.description : ""}</p>
                                            </div>
                                            <div className='productDetails'>
                                                <div className='card-rating'>
                                                    <div className='rating-stars'><img src={Star} alt="" /></div>
                                                    <div className='rating-number'><p>4.5(86)</p></div>
                                                </div>
                                            </div>

                                                <div className='card-price-section'>
                                                    <div className='card-price-section-items price'><p>{obj ? obj.offer_price : ""}</p></div>
                                                    <div className='card-price-section-items button'><button type="submit" onClick={() => addtoCart(obj)}>Add to Cart</button></div>
                                                </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            </div>

            <div className='homeproductmore'>
                <button onClick={handleViewMoreClick}>View More</button>
            </div>
        </>
    )
}

export default HomeCards