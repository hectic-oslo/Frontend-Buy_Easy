import React, { useState} from "react";
import FormContainer from "../components/formContainer";
import { Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/cartAction";
import { useNavigate } from "react-router";
import CheckOut from "../components/checkOutComponent";

const ShippingScreen = () => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate(`/payment`)
        
    }
  return <>

   
       <FormContainer>
       <CheckOut step1 step2/>
           <h1>SHIPPING DETAILS</h1>
           <Form onSubmit={submitHandler}>

        <Form.Group  controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e)=>(setAddress(e.target.value))}/>        
        </Form.Group>

         <Form.Group  controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city name" value={city} required  onChange={(e)=>(setCity(e.target.value))}/>        
        </Form.Group>
         
        <Form.Group  controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="Enter Postal Code" value={postalCode} required onChange={(e)=>(setPostalCode(e.target.value))}/>        
        </Form.Group>

        <Form.Group  controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country name" value={country} required onChange={(e)=>(setCountry(e.target.value))}/>        
        </Form.Group>

        <Button type='submit' variant='dark'>CONTINUE</Button>

        </Form>

       </FormContainer>
  </>;
};

export default ShippingScreen;
