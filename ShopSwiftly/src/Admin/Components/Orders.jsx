import React, { useEffect, useState } from 'react'
import './Orders.css'
import Axios from '../../Static/Axios'
import { ImgUrl } from '../../Static/ImagUrl';


function Orders() {
  
  const [userData, setUserData] = React.useState("");
  const [Product, setProduct] = React.useState([]);
  const [orders,setOrders] = useState([])
  const [userDetails,setUserDetials] = React.useState([]);
  

 

    
    const Getproducts = ()=>{
      try {
        Axios.get('/admin/getorders').then((response)=>{
          
          console.log(response.data[0].userId,"cart products")
          setUserData(response.data[0].userId)
          console.log(response.data,"response.data")
          setOrders(response.data)
          setProduct(response.data[0].product)
        })
 
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
            
          try {
            Getproducts()
          } catch (error) {
              console.log(error)
          }
    }, [])

 const updateStatus = (value,cartID) =>{
  console.log("clicked..")
      console.log(value,"value");
      let cartId =cartID;
      let status = {
        value,
        cartId
      }

      try {
        Axios.post('/admin/shippingStatus',status).then((response)=>{
            console.log(response.data)
            
        })
      } catch (error) {
          console.log(error)
      }
 }

  return (
    <>
        <>
        <section className='admin_orders'>
               <div className='order_heading'>
                    <h1>Orders</h1>
                    <p></p>
               </div>
               <div className='order_list'>
                <table>
                  
                      <tr>
                      <th>OID</th>
                      <th>Product Name</th>
                      <th>Customer Name</th>
                      <th>Details</th>
                      <th>Confirmation</th>
                  </tr>
                 
                    
                         {

                              orders.map((order,index) => {

                                return order.product.map((Product) => (
                                  <tr key={Product.offer_price}>
                                    <td><img src={ImgUrl + '/' + Product._id+'.jpg'} alt="" /></td>
                                    <td>{Product.name}</td>
                                    <td>{Product.Category}</td>
                                    <td>
                                      <div className='order-details'>
                                        <p>Name : {userDetails ? userDetails.UserName : ''}</p>
                                        <p>Email : {userDetails.Email}</p>
                                        <p>Address : </p>
                                        <div className='order-details-btn'>
                                          <div className='order-details-btns'>
                                            <button onClick={()=>updateStatus(1,order._id)}>Shipped</button></div>
                                          <div className='order-details-btns'>
                                            <button onClick={()=>updateStatus(2,order._id)}>Pick Up</button></div>
                                          <div className='order-details-btns'>
                                            <button onClick={()=>updateStatus(3,order._id)}>Out of Delivery</button></div>
                                          <div className='order-details-btns'>
                                            <button onClick={()=>updateStatus(4,order._id)}>Delivered</button></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>  
                                      <div className='table-btn'>
                                      <button onClick={updateStatus(1,order._id)} style={{backgroundColor:"#29bf12",
                                                      border:"none",
                                                      outline:"none",
                                                      color:"white",
                                                      fontSize : "12px"
                                    
                                    }}>Confirm</button>
                                      <button style={{backgroundColor:"#e01e37",
                                                      border:"none",
                                                      outline:"none",
                                                      color:"white",
                                                      marginLeft:"10px"  
                                    }}>Cancel</button>
                                      </div>
                                    </td>
                                  </tr>
                                ));

                              })
                                                        
                         }
                   
                       
                </table>
               </div>
              
        </section>
    </>
    </>
  )
}

export default Orders