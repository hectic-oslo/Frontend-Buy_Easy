import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Actions/orderAction";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CheckOut from "../components/checkOutComponent";
import Message from "../components/message";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,0);
    
  cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 99).toFixed(2);
  cart.taxPrice = Number((0.11 * cart.itemsPrice).toFixed(2));

  cart.totalPrice =
   ( Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;
  const navigate = useNavigate();
  useEffect(() => {
    if (success) navigate(`/order/${order._id}`);
  });
  const dispatch = useDispatch();

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckOut step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address},{shippingAddress.city}{" "}
                {shippingAddress.postalCode} {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>METHOD:</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroupItem variant="flush">
                  {cartItems.map((item, index) => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price}= ₹ {item.qty * item.price}
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
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Taxes</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Price</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  variant="dark"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
