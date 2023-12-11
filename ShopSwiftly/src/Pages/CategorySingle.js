import React from 'react'
import CategorySinglePage from '../Components/CategoriesSingle'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useParams } from 'react-router'

function CategorySingle() {
    const {id} = useParams()
      console.log(id,"id from single")
  return (
    <>
        <Navbar/>
        <CategorySinglePage id={id}/>
        <Footer/>
    </>
  )
}

export default CategorySingle