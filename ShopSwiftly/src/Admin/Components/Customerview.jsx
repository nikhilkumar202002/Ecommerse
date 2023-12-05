import React, { useEffect, useState } from 'react'
import './Customerview.css'
import Axios from '../../Static/Axios'

function Customerview() {

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
       
        Axios.get('/admin/getCustomer').then((response) => {
            console.log(response.data,"hello")
            setCustomers(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  return (
    <>
        <section className='admin-cust-view'>
            <div className='admin-cust-view-heading'>
                <h1>Customer View</h1>
            </div>

            <div className='admin-cust-view-table'>
                <table>
                    <tr>
                        <td>CustID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                    </tr>
                    
        {
        customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer._id}</td>
                  <td>{customer.UserName}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Phone}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
                </table>
            </div>
        </section>
    </>
  )
}

export default Customerview