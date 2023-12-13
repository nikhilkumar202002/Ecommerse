import React from 'react'
import CategorySinglePage from '../Components/CategoriesSingle'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useParams } from 'react-router'

function CategorySingle() {
    const category = useParams()
      console.log(category,"id from single")
  return (
    <>
        <Navbar/>
        <CategorySinglePage />
        <Footer/>
    </>
  )
}

export default CategorySingle