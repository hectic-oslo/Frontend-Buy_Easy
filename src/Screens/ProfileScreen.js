import React, { useState, useEffect } from "react";
import { Col, Row,Form ,Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserDetails,updateUserProfile } from "../Actions/userAction";
import Message from "../components/message";
import Loader from "../components/loader";
import {  useLocation, useNavigate } from "react-router";
import { listMyOrders } from "../Actions/orderAction";


const ProfileScreen = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage]= useState(null)
  
  
   const navigate=useNavigate()
  const location=useLocation()
  //const redirect=location.search?location.search.split('=')[1]:'/'

  const userDetails=useSelector(state=>state.userDetails)
  const {loading,user,error}=userDetails

  const orderMyList=useSelector(state=>state.orderMyList)
  const {loading:loadingOrders,orders,error:errorOrder}=orderMyList

  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const dispatch=useDispatch()
  useEffect(()=>{
      if(!userInfo){
          navigate(`/login`)
      }
      else
      {
          
          if(!user.name){
              dispatch(getUserDetails('profile'))
              dispatch(listMyOrders())
          }
          else{
              setName(user.name)
              setEmail(user.email)
              
          }
      }
  },[navigate,userInfo,user,dispatch])

  const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
  const {success}=userUpdateProfile  

  const submitHandler=(e)=>{ 
    e.preventDefault()
    if(password!==ConfirmPassword)
    {
        setMessage('Password do not match')
    }
    else
    {
        dispatch(updateUserProfile({_id:user._id,name,email,password}))
    }
          
    }
  return (
    <Row>
        <Col md={3}>
        <h2>USER PROFILE </h2>
        {(error) && <Message variant='danger'>{error}</Message>}
        {(message) && <Message variant='danger'>{message}</Message>}        
        {(success) && <Message variant='success'><i>PROFILE UPDATED </i></Message>}
        {/* {loading && <Loader/>} */}
      <Form onSubmit={submitHandler}>
      
      <Form.Group  controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>(setName(e.target.value))}/>
         
        </Form.Group>

        <Form.Group  controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>(setEmail(e.target.value))}/>
         
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required value={password} onChange={(e)=>(setPassword(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e)=>(setConfirmPassword(e.target.value))} />
        </Form.Group>
        
        <Button variant="dark" type="submit">
          UPDATE
        </Button>
      </Form>
        </Col >
        <Col md={9}>
            <h2> MY ORDERS</h2>
            {loadingOrders ?<Loader/>:errorOrder?<Message variant='danger'>{errorOrder}</Message>:(
              <Table stripped="true" bordered responsive className='table-sm'>
                 <thead>
                   <tr>
                     <th>ID</th>
                     <th>date</th>
                     <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                   </tr>
                 </thead>
                 <tbody>
{/* unresolved undefined error */}{ orders!==undefined &&
                     orders.map((order,index)=>
                       <tr key={index}> 
                         <td>{order._id}</td>   
                         <td>{order.createdAt.substring(0,10)}</td> 
                         <td>{order.totalPrice}</td> 
                         <td>{order.isPaid?order.paidAt.substring(0,10):(<i className='fas fa-times'
                          style={{color:'red'}}></i>)}</td> 
                         <td>{order.isDelivered?order.deliveredAt.substring(0,10):(<i className='fas fa-times'
                          style={{color:'red'}}></i>)}</td>      
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button variant='light' >Details</Button>
                            </LinkContainer>
                          </td>  
                       </tr>
                     )
                   }
                 </tbody>
              </Table>
            )}
        </Col>
  </Row>
   
  )
}

export default ProfileScreen;
