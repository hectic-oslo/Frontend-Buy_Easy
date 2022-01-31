import React, { useState, useEffect } from "react";
import Loader from "../components/loader";
import {
  Form,
  Button,
  Row,
  Card,
  Image,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder ,deliverOrder} from "../Actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Message from "../components/message";
import axios from "axios";
import { useNavigate } from "react-router";
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from "../Constants/orderConstants";

const OrderScreen =  () => {



  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {loading:loadingPay, success:successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {loading:loadingDeliver, success:successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

   const [sdkReady,setSdkReady]=useState(false)
  useEffect(() => {
     if(!userInfo){
       navigate(`/login`)
     }

    const addPayPalScript=async()=>{
      const{data:clientId}=await axios.get('/Api/config/paypal')
      const script=document.createElement('script')
      script.type='text/javascript'
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async=true
      script.onload=()=>{
        setSdkReady(true)
      }
     document.body.appendChild(script)

    }
    if(!order || successPay||successDeliver){
      dispatch({type:ORDER_PAY_RESET})
      dispatch({type:ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid) {
        if(!window.paypal){
          addPayPalScript()
        }else{
          setSdkReady(true)
        }
    }
    }, [dispatch,orderId,successPay,order,successDeliver,navigate,userInfo]);



  // console.log(order);

  const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult))
  }
  

  

     const razorPayHandler=async(amt)=>{

      var raz_paymentId =''
      var raz_orderId=''
      var raz_signature=''
           
      const script=document.createElement('script')
      script.type='text/javascript'
      script.src=`https://checkout.razorpay.com/v1/checkout.js`
      script.async=true
     document.body.appendChild(script)

     const razdata= await axios.post('/Api/config/razorpay')
          console.log(razdata)
     var options = {
      "key": 'rzp_test_NENjtw57a4vV8I', 
      "amount": amt*100, 
      
      "currency": "INR",
      "name": "Buy-Easy Inc.",
      "description": "At Buy-Easy we ensure your safety over any thing",
      "image": "/android-chrome-192x192.png",
      "order_id": `${razdata.data.id}`, 
      "handler": function async(response){
           raz_paymentId=response.razorpay_payment_id
           raz_orderId=response.razorpay_order_id
           raz_signature=response.razorpay_signature
          },
      "theme": {
          "color": "#3399cc"
      }
  };
        
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
  // e.preventDefault();
  const config={
    headers:{
       'Content-Type':'application/json',    
    },
}

// actual data is not posting
    const resData=await axios.put(`/Api/razorpay/${orderId}/details`,{raz_paymentId,raz_orderId,raz_signature},config)
  
    // console.log(resData);
  }
     


  const deliverHandler=()=>{
    
    dispatch(deliverOrder(order))
  }





  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {order !== undefined && (
        <>
          <h2>Order Id</h2>{" "}
          <u>
            <h5>{order._id}</h5>
          </u>
          {/*❤ error can occur*/}
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping Details</h2>
                  <p>
                    <strong>Name :</strong>
                    {order.user.name}
                  </p>
                  <p>
                    {" "}
                    <strong>Email :</strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered On {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>METHOD:</strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid On {order.paidAt.substring(0,10)}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is Empty</Message>
                  ) : (
                    <ListGroupItem variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              ></Image>
                            </Col>
                            <Col>
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ₹{item.price}= ₹{" "}
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroupItem>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Items</Col>
                      <Col>₹{order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹{order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Taxes</Col>
                      <Col>₹{order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>₹{order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  {!order.isPaid &&(
                    <>
                    <ListGroupItem>
                      {loadingPay&&<Loader/>}
                      {!sdkReady?<Loader/>:(
                           <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/> 
                      )}                    
                    </ListGroupItem>
                     
                    <ListGroupItem>
                      <Button variant='dark' type='button' onClick={()=>razorPayHandler(order.totalPrice)}>PAY WITH RAZORPAY</Button>
                    </ListGroupItem>
                    
                  
                    </>
            
                     )}     
                      {userInfo&&userInfo.isAdmin && order.isPaid && !order.isDelivered&&(
                     <ListGroupItem>
                       <Button type='button' variant='dark' className='btn btn-block' onClick={deliverHandler}>Mark as Delivered</Button>
                     </ListGroupItem>
                   )}             
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
