import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import Product1 from'../Images/product 1.jpg'
import Axios from '../Static/Axios'
import { UserContext } from '../Static/UserContext'


function Myorders() {
  const {user,setUser} = useContext(UserContext)
  const [Products , setproducts] = useState([])
      useEffect(() => {
        if(user){
          let userdata = user.user;
          console.log(userdata)
            try {
              Axios.post('/myorders',userdata).then((response)=>{
                  console.log(response.data,"my orders data")
                  setproducts(response.data.product)
              })
            } catch (error) {
              
            }
        }
        
      }, [])
      
  
  return (

    <>
       <div className='myorders_heading'>
        <h1>My Orders</h1>
       </div>
      <section className='myorders_cards'>
       {
          Products ? 
          Products.map((product)=>{
                return(
                  <>
                       <div className='myorders_main_cards'>
                            <div className='myorders_card'>
                              <div className='myorder_card_left'>
                                <img src={Product1} alt=""/>
                              </div>
                              <div className='myorder_card_right'>
                                  <p><b>{product.name}</b></p>
                                  <p>${product.offer_price}</p>
                                  <p>Qty : {product.quantity}</p>
                                  <button>Track Order</button>
                              </div>
                            </div>
                      </div>
                  </>
                )
          }) :
            <h1>Empty!</h1>
        

      }

       </section>
    </>
  )
}

export default Myorders