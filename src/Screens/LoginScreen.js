import React, { useState, useEffect } from "react";
import FormContainer from "../components/formContainer";
import { Col, Row,Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Actions/userAction";
import Message from "../components/message";
import Loader from "../components/loader";
import {  useLocation, useNavigate } from "react-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
   const navigate=useNavigate()
  const location=useLocation()
  const redirect=location.search?location.search.split('=')[1]:''
  

  const userLogin=useSelector(state=>state.userLogin)
  const {loading,userInfo,error}=userLogin
  useEffect(()=>{
      if(userInfo){
          navigate(`/${redirect}`)
      }
  },[navigate,userInfo,redirect])
  
  const dispatch=useDispatch()
  const submitHandler=(e)=>{ 
    e.preventDefault()
      dispatch(login(email,password))
          
    }
    
  return (
    <>
   
   <FormContainer>
        <h1>SIGN IN </h1>
        {(error) && <Message variant='danger'>{error}</Message>}
        {/* {loading && <Loader/>} */}
      <Form onSubmit={submitHandler}>
        <Form.Group  controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>(setEmail(e.target.value))}/>
         
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
        </Form.Group>
        
        <Button variant="dark" type="submit">
          SIGN IN
        </Button>
      </Form>
       <Row className="py-3">
           <Col>
            New Customer ?{''}<Link to={redirect?`/register?redirect=${redirect}`:`/register`}>Register</Link>
           </Col>
       </Row>
    </FormContainer>
    
   </>
   
  )
}

export default LoginScreen;
