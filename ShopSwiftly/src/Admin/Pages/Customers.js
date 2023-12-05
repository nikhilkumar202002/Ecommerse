import React from 'react'
import Sidebar from '../Components/Sidebar'
import Customerview from '../Components/Customerview'
function Customers() {
  return (
    <>
        <div className='cust-page'>
            <Sidebar/>
            <Customerview/>
        </div>
    </>
  )
}

export default Customers