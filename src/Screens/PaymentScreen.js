import React, { useState } from "react";
import FormContainer from "../components/formContainer";
import { Form, Button,Col,Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Actions/cartAction";
import { useNavigate } from "react-router";
import CheckOut from "../components/checkOutComponent";

const PaymentScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) navigate(`/shipping`);

  const [paymentMethod, setPaymentMethod] = useState("RazorPay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(`/placeorder`);
  };
  return (
    <>
      <FormContainer>
        <CheckOut step1 step2 step3 />
        
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
          
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="Paypal"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="RazorPay"
              id="RazorPay"
              name="paymentMethod"
              value="RazorPay"
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          </Form.Group>
          <Button type="submit" variant="dark">
            CONTINUE
          </Button>
        </Form>
      </FormContainer> 
    </>
  );
};

export default PaymentScreen;
