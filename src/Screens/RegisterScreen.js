import React, { useState, useEffect } from "react";
import FormContainer from "../components/formContainer";
import { Col, Row,Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Actions/userAction";
import Message from "../components/message";
import Loader from "../components/loader";
import {  useLocation, useNavigate } from "react-router";

const RegisterScreen = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage]= useState(null)
  
  
   const navigate=useNavigate()
  const location=useLocation()
  const redirect=location.search?location.search.split('=')[1]:''

  const userRegister=useSelector(state=>state.userRegister)
  const {loading,userInfo,error}=userRegister
  useEffect(()=>{
      if(userInfo){
          navigate(`/${redirect}`)
      }
  },[navigate,userInfo,redirect])

  const dispatch=useDispatch()
  const submitHandler=(e)=>{ 
    e.preventDefault()
    if(password!==ConfirmPassword)
    {
        setMessage('Password do not match')
    }
    else
    {
        dispatch(register(name,email,password))
    }
          
    }
    
  return (
    <>
   
   <FormContainer>
        <h1>SIGN UP </h1>
        {(error) && <Message variant='danger'>{error}</Message>}
        {(message) && <Message variant='danger'>{message}</Message>}
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
          <Form.Control type="password" minLength='5' placeholder="Password" required value={password} onChange={(e)=>(setPassword(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e)=>(setConfirmPassword(e.target.value))} />
        </Form.Group>
        
        <Button variant="dark" type="submit">
          REGISTER
        </Button>
      </Form>
       <Row className="py-3">
           <Col>
            Have An Account ?{''}<Link to={redirect?`/login?redirect=${redirect}`:`/login`}>Login</Link>
           </Col>
       </Row>
    </FormContainer>
    
   </>
   
  )
}

export default RegisterScreen;
