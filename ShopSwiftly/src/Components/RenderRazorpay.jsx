import { useEffect, useRef,useContext } from 'react';
import Axios from '../Static/Axios';
import cryptojs from 'crypto-js'
import { UserContext } from '../Static/UserContext'
import {Routes, Route, useNavigate} from 'react-router-dom';

const RenderRazorpay = ({
  orderId,
  keyId,
  keySecret,
  currency,
  amount,
  serverBaseUrl,
  setDisplayRazorpayCallback // You should define serverBaseUrl
}) => {
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserContext)

  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log('Razorpay loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.log('Error loading Razorpay');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  const displayRazorpay = async (options) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const rzp = new window.Razorpay(options);

    rzp.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    rzp.open();
  };

  const handlePayment = async (status, orderDetails = {}) => {
    try {
      await Axios.post('/payment', {
        status,
        orderDetails,
        user
      });
      if(status ==='succeeded'){
            navigate('/')
      }
      console.log("Payment Completed")
   
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  useEffect(() => {
    const options = {
      key: keyId, // Add your Razorpay key
      amount: amount * 100, // Amount should be in the smallest currency unit (e.g., cents for USD)
      currency,
      name: 'BytrBoot',
      description: 'Payment for your order',
      order_id: orderId,
      handler: (response) => {
        console.log('succeeded');
        console.log(response,"hello");
        paymentId.current = response.razorpay_payment_id;
        console.log(orderId,"orderid")
        // Most important step to capture and authorize the payment. This can be done of Backend server.
        const succeeded = cryptojs.HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret).toString() === response.razorpay_signature;
        console.log(succeeded,"hi")
        // handlePayment('timedout');

        // setDisplayRazorpay(false)
    
        // If successfully authorized. Then we can consider the payment as successful.
        if (succeeded) {
          handlePayment('succeeded', {
            orderId,
            paymentId,
            signature: response.razorpay_signature,
          });
        } else {
          handlePayment('failed', {
            orderId,
            paymentId: response.razorpay_payment_id,
          });
        }
      },modal: {
        confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
        // This function is executed when checkout modal is closed
        // There can be 3 reasons when this modal is closed.
        ondismiss: async (reason) => {
          const {
            reason: paymentReason, field, step, code,
          } = reason && reason.error ? reason.error : {};
          // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly. 
          if (reason === undefined) {
            console.log('cancelled');
            handlePayment('Cancelled');
          } 
          // Reason 2 - When modal is auto closed because of time out
          else if (reason === 'timeout') {
            console.log('timedout');
            handlePayment('timedout');
          } 
          // Reason 3 - When payment gets failed.
          else {
            console.log('failed');
            handlePayment('failed', {
              paymentReason, field, step, code,
            });
          }
        },
      },
      prefill: {
        // Add pre-filled customer details if needed
      },
      notes: {
        // Add any notes or additional information if needed
      },
      theme: {
        color: '#F37254', // Set theme color
      },
    };

    console.log('In Razorpay');
    displayRazorpay(options);
  }, [orderId, keyId, amount, currency, serverBaseUrl]);

  return null;
};

export default RenderRazorpay;
