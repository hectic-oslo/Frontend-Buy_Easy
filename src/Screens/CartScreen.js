import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation,useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart,removeFromCart } from "../Actions/cartAction";
import Message from "../components/message";

const CartScreen = () => {
  const { id } = useParams();
  const productId = id;
  const location = useLocation();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const navigate=useNavigate()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const RemoveFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };
  const CheckOutHandler = () => {
    navigate(`/login?redirect=shipping`)
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item ,index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2} xs={4}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} xs={2}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>₹{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => RemoveFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) ITEMS
                </h2>
              </ListGroupItem>
              <em>₹{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}</em>
            </ListGroup>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                variant="dark"
                disabled={cartItems.length === 0}
                onClick={CheckOutHandler}>
                PROCEED TO CHECKOUT
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
