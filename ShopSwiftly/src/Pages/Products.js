import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Cards from '../Components/Product_cards'
import { useState, useEffect } from 'react';
import './Style.css'
function Products() {
  const [isSticky, setSticky] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) { // Change this value to your desired scroll position
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <nav className={isSticky ? 'sticky' : ''}>
    <Navbar/>
    </nav>
       
            <Cards/>
        <Footer/>
    </>
  )
}

export default Products