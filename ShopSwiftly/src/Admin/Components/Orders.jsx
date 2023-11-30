import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Orders.css'
import Axios from '../../Static/Axios'
import { ImgUrl } from '../../Static/ImagUrl';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Orders() {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [Product, setProduct] = React.useState([]);
  const [userDetails,setUserDetials] = React.useState([]);
  const viewOrderstyle = {
    backgroundColor: "rgb(133, 133, 255)",
    border:"none",
    color:"white",
    fontSize:"12px"
  }
 
  const handleOpen = () => {
        let userId= userData;
        console.log(userData,"userData")
        let user ={
          userData
        }
        console.log(user,"object")
          try {
            Axios.post('/admin/GetUser',user).then((response)=>{
              console.log(response,"user fetch data")
              setUserDetials(response.data[0])
              setOpen(true)
            })
          } catch (error) {
            
          }
         
    };
  const handleClose = () => setOpen(false);
    const [orders,setOrders] = useState([])
    useEffect(() => {

      try {
        Axios.get('/admin/getorders').then((response)=>{
          
          console.log(response.data[0].userId,"cart products")
          setUserData(response.data[0].userId)
          setOrders(response.data[0])
          setProduct(response.data[0].product)
        })
 
      } catch (error) {
        console.log(error)
      }
          
 }, [])

 const updateStatus = (value) =>{
      console.log(value);
      let cartId = orders._id;
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
                          Product.map((Product)=>
                          <tr key={Product.offer_price}>
                          <td> <img src={  ImgUrl + '/' + Product._id+'.jpg'} alt=""/></td>
                            <td>{Product.name}</td>
                            <td>{Product.Category}</td>
                            <td><button onClick={handleOpen} style={viewOrderstyle}>View Order</button>
                            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal_container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal_content'>
              <p>Username : { userDetails ? userDetails.UserName : ""}</p>
              <p>Email : {userDetails.Email}</p>
              <p>Address : </p>
              <div className='modal_btn'>
                <div className='modal_btns'><button onClick={() =>updateStatus("Shipped")}>Shipped</button></div>
                <div className='modal_btns'><button onClick={() =>updateStatus("Pickuped")}>PickUp</button></div>
                <div className='modal_btns'><button onClick={() =>updateStatus("Out of Delivery")}>Out of Delivery</button></div>
                <div className='modal_btns'><button onClick={() =>updateStatus("Delivered")}>Delivered</button></div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
                            </td>
                            <td><button>Confrim</button><button>Cancel</button></td>
                            
                        </tr>
                          )
                          
                  
                         }
                   
                       
                </table>
               </div>
              
        </section>
    </>
    </>
  )
}

export default Orders