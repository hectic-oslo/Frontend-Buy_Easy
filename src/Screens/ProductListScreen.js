import React, { useEffect } from "react";
import { Button, Table,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/Paginate";
import { useNavigate ,useParams} from "react-router";
import { listProducts,deleteProduct,createProduct} from "../Actions/productAction";
import { PRODUCT_CREATE_RESET } from "../Constants/productConstants";

const ProductListScreen = () => {
  const {pageNumber}=useParams()||1
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products,pages,page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading:loadingCreate, error:errorCreate, success:successCreate,product:createdProduct} = productCreate;

  useEffect(() => {

    dispatch({type:PRODUCT_CREATE_RESET})
    if(!userInfo.isAdmin){
        navigate(`/login`)
     }
    if(successCreate)
    {
      navigate(`/admin/products/${createdProduct._id}/edit`)
    }
    else{
        dispatch(listProducts('',pageNumber));
    }
  }, [dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,pageNumber]);
   

  const deleteHandler=(id)=>{
     if(window.confirm('Are you sure ?')){
      dispatch(deleteProduct(id))
     }
     }

  const createProductHandler=(product)=>{
     dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
          <Col>
          <h1>Products</h1>
          </Col>
          <Col className='text-right'>
              <Button className='my-3' onClick={createProductHandler} variant='dark'><i className='fas fa-plus'></i>Create Product</Button>
          </Col>
      </Row>

      {loadingDelete&&<Loader/>}
        {errorDelete&&<Message variant='danger'>{errorDelete}</Message>}

        
      {loadingCreate&&<Loader/>}
        {errorCreate&&<Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (<>
        <Table responsive stripped='true' bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-3"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
