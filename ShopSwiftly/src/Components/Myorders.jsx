import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import Product1 from '../Images/product 1.jpg'
import Axios from '../Static/Axios'
import { UserContext } from '../Static/UserContext'
import { ImgUrl } from '../Static/ImagUrl'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Myorders() {

  const statusStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    color: '#FD7B2B' ,
    borderRadius:'20px'
  };
  const { user, setUser } = useContext(UserContext)
  const [Products, setproducts] = useState([])
  const [shipMentStatus,setshipMentStatus] = useState('')
  useEffect(() => {
    if (user) {
      let userdata = user.user;
      console.log(userdata)
      try {
        Axios.post('/myorders', userdata).then((response) => {
          console.log(response.data, "my orders data")
          setproducts(response.data.product)
          setshipMentStatus(response.data.shippingStatus)
        })
      } catch (error) {

      }
    }

  }, [])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return (

    <>
      <div className='myorders_heading'>
        <h1>My Orders</h1>
      </div>
      <section className='myorders_cards'>
        {
          Products ?
            Products.map((product) => {
              return (
                <>
                  <div className='myorders_main_cards'>
                    <div className='myorders_card'>
                      <div className='myorder_card_left'>
                        <img src={ImgUrl + '/' + product._id + '.jpg'} alt="" />
                      </div>
                      <div className='myorder_card_right'>
                        <p><b>{product.name}</b></p>
                        <p>${product.offer_price}</p>
                        <p>Qty : {product.quantity}</p>
                        <button onClick={handleOpen}>Track Order</button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={statusStyle}>
                            <Typography id="modal-modal-title order-status" variant="h6" component="h2" style={{fontSize:'25px',color:'black',fontFamily:'Poppins',fontWeight:'700'}}>
                              Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <div className='track-order'>
                                <div className='track-order-list' style={{color:"#5cb85c"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5cb85c" class="bi bi-shop-window" viewBox="0 0 16 16">
                                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                                <br />
                                Order Placed
                                </div>
                                <div className='progressline' style={{ color: shipMentStatus >= 2 ? '#5cb85c' : 'black' }}></div>
                                <div className='progressline-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#5cb85c" style={{marginTop:"5px"}} class="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                </div>

                                <div className='track-order-list'  style={{lineHeight:"8px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={
                                  shipMentStatus>=2 ? "#5cb85c" : "black" 
                                } class="bi bi-truck-flatbed" viewBox="0 0 16 16">
                                <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1"/>
                                </svg>
                                <br />
                  
                                  <p style={{ color: shipMentStatus >= 2 ? '#5cb85c' : 'black' }}>PickUp</p>

                                
                                </div>
                                <div className='progressline' style={{ color: shipMentStatus >= 2 ? '#5cb85c' : 'black' }}></div>
                                <div className='progressline-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill={
                                  shipMentStatus>=2 ? "#5cb85c" : "black" 
                                } style={{marginTop:"5px"}} class="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                </div>

                                <div className='track-order-list' style={{lineHeight:"8px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={
                                  shipMentStatus >= 3 ? "#5cb85c" : "black" 
                                } class="bi bi-truck" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                                </svg>
                                <br />
                                <p style={{ color: shipMentStatus >= 3  ? '#5cb85c' : 'black' ,lineHeight:"20px "}}>Out <br /> of Delivery</p>

                                </div>
                                <div className='progressline' style={{ color: shipMentStatus >= 2 ? '#5cb85c' : 'black' }}></div>
                                <div className='progressline-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill={
                                  shipMentStatus>=2 ? "#5cb85c" : "black" 
                                } style={{marginTop:"5px"}} class="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                </div>
                                <div className='track-order-list' style={{lineHeight:"8px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={ shipMentStatus >= 4 ? "#5cb85c" : "black"}  class="bi bi-dropbox" viewBox="0 0 16 16">
                                <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555-4.006-2.555Zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555L8.01 9.651Z"/>
                                </svg>
                                <br />
                                <p style={{ color: shipMentStatus >=4? '#5cb85c' : 'black' }}>Delivered</p>

                                </div>
                              </div>
                            </Typography>
                          </Box>
                        </Modal>
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