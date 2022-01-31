import React from "react";
// import products from '../products'
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import MetaTags from '../components/MetaTags'
import Rating from "../components/Rating";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails,createReviewProduct } from "../Actions/productAction";
import Loader from "../components/loader";
import Message from "../components/message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/productConstants";
import{Link}from "react-router-dom"

const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, Product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { error:errorReview, success:successReview } = productCreateReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id } = useParams();

  useEffect(() => {
    if(successReview)
    {
      alert('Review Submitted Successfully!')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      setRating(0)
      setComment('')
    }
    dispatch(listProductDetails(id));
  }, [dispatch,successReview, id]);

  function AddtoCartHandler(e) {
    navigate(`/cart/${id}/?qty=${qty}`);

    e.preventDefault();
  }
  const createRatingHandler=(e)=>{
    e.preventDefault();
     dispatch(createReviewProduct(id,{rating,comment}))
    
  }
  
  return (
    <>
    
      {" "}
      <h1>{Product.name}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (<> <MetaTags title={Product.name}/>
        <Row>
          <Col md={6}>
            <Image src={Product.image} alt={Product.name} fluid />
          </Col>
          <Col md={3} variant="flush">
            <ListGroup>
              <ListGroup.Item>
                <h3>{Product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={Product.rating}
                  text={`${Product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:₹ {Product.price}</ListGroup.Item>
              <ListGroup.Item>{Product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹ {Product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {Product.countInStock > 0 ? "In stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {Product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setqty(e.target.value)}
                        >
                          {[...Array(Product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    variant="dark"
                    onClick={AddtoCartHandler}
                    disabled={Product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          
          <Col md={6}>
          <h1>REVIEWS</h1>
          {Product.reviews.length===0 && <Message>No reviews</Message>}
          <ListGroup variant='flush'>
            {Product.reviews.map((review,index)=>(
              <ListGroupItem key={index}>
                <strong>{review.name}</strong>
                <Rating value={review.rating}/>
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comment}</p>
                </ListGroupItem>
            ))}
            <ListGroupItem>
              <h2>Write a Customer Review</h2>
              {errorReview&&<Message>{errorReview}</Message>}
              {!userInfo?(<Message>Please <Link to={`/login`}>login</Link> to write a review</Message>):(
                <>
                <Form >
                  <Form.Group controlId='rating'>
                     <Form.Label>Rating</Form.Label>
                     <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                      <option value=''>Select</option>
                      <option value='1'>1-Poor</option>
                      <option value='2'>2-Fair</option>
                      <option value='3'>3-Good</option>
                      <option value='4'>4-Very Good</option>
                      <option value='5'>5-Excellent</option>
                     </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row="4"value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  </Form>
                </>
              )}
            </ListGroupItem>
            <Button type='submit'variant='dark' className='btn-block'onClick={createRatingHandler}>Submit</Button>
          </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
