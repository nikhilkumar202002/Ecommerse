import React from 'react'
import Products from '../Components/SinglePage'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useParams } from 'react-router'
  
function Signleproduct() {
      const {id} = useParams()
      console.log(id,"id from single")
  return (
    <>
        <Navbar/>
        <Products id={id}/>
        <Footer/>
    </>
  )
}

export default Signleproduct