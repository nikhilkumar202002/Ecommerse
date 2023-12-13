import React from 'react'
import BannerImages from '../Images/Wavy_Tech-19_Single-05.jpg'
import './Banner.css'
function Banner() {
  return (
    <>
    <section className='banner-section'>
    <div className='banner'>
        <div className='bannerLeft'>
            <div className='bannerHeading'>
            <h1>Endless <br />Online <span>Treasures.</span></h1>
            </div>
            <div className='bannerSubheading'>
            <p>Get the best deals on electronics, fashion and more. Shop now for your favorite brands at unbeatable prices</p>
            </div>
            <div className='bannerButton'>
            <button>Shop Now</button>
            </div>
           
        </div>
        <div className='bannerRight'>
          <div className='banner-right-image'>
          <img src={BannerImages} alt="" />
          </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default Banner