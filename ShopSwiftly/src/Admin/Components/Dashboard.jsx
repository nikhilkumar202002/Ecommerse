import React, { useEffect, useState } from 'react'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css";
import './Dashboard.css'
import Axios from '../../Static/Axios'

function Dashboard() {
  const [countsData, setCountsData] = useState({
    productCount: 0,
    custCount: 0,
    orderCount: 0,
    deliveredProductCount: 0
  });

  useEffect(() => {
    Axios.get('/admin/getCounts').then((response)=>{
      try {
        console.log(response.data,"hello")
      } catch (error) {
        console.log(error)
      }
    })
  }, [])
  

  return (
    <>
        <section className='admin_dash'>
            <nav className='admin_nav'>
               <div className='dash_heading'>
                    <p>Welcome</p>
                    <h1>Admin Dashboard</h1>
                    <p></p>
               </div>
               <div className='admin_search'>
                <input type="text" placeholder="Search"/>
                <button>Search</button>
               </div>

            </nav>

            <div className='dash_header'>
                <div className='dash_box'><p>Products <br></br><span>{countsData.productCount}</span></p></div>
                <div className='dash_box'><p>Categories<br></br><span>{countsData.custCount}</span></p></div>
                <div className='dash_box'><p>Orders<br></br><span>{countsData.orderCount}</span></p></div>
                <div className='dash_box'><p>Delivered<br></br><span>{countsData.deliveredProductCount}</span></p></div>
            </div>
        </section>
    </>
  )
}

export default Dashboard