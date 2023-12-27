import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Banner from '../Components/Banner'
import HomeCards from '../Components/HomeCards'
import Aboutus from '../Components/Aboutus'
import { useState, useEffect } from 'react';
import './Style.css'


function Home() {

  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) { 
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <>
      <nav className={isSticky ? 'sticky' : ''}>
        <Navbar />
      </nav>
      <Banner />
      <HomeCards />
      <Aboutus />

      <Footer />
    </>
  )
}

export default Home