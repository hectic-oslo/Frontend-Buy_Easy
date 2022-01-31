import React, { useState, useEffect } from "react";
import FormContainer from "../components/formContainer";
import {Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductDetails,updateProduct} from "../Actions/productAction";
import Message from "../components/message";
import Loader from "../components/loader";
import {useNavigate } from "react-router";
import { useParams } from "react-router";
import {PRODUCT_UPDATE_RESET } from "../Constants/productConstants";
import axios from 'axios'
 
const ProductEditScreen = () => {
 const {id:productId}=useParams()

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  
   const navigate=useNavigate()
   const dispatch=useDispatch()

  const productDetails=useSelector(state=>state.productDetails)
  const {loading,Product,error}=productDetails

  const productUpdate=useSelector(state=>state.productUpdate)
  const {loading:loadingUpdate,success:successUpdate,error:errorUpdate}=productUpdate

  useEffect(()=>{
       if(successUpdate)
       {
         dispatch({type:PRODUCT_UPDATE_RESET})
         navigate(`/admin/productlist`)
       }
      else{
        
        if(!Product.name||Product._id!==productId){
          dispatch(listProductDetails(productId))
      }else{
          setName(Product.name)
          setImage(Product.image)
          setBrand(Product.brand)
          setCountInStock(Product.countInStock)
          setDescription(Product.description)
          setPrice(Product.price)
          setCategory(Product.category)
          
      }
      }
     
  },[dispatch,Product,productId,navigate,successUpdate])

  
  const submitHandler=(e)=>{ 
    e.preventDefault() 
   dispatch(updateProduct({_id:productId,name,image,brand,countInStock,description,price,category}))
         
    }


  const uploadFileHandler=async(e)=>{
      const file=e.target.files[0]
      const formData=new FormData()
      formData.append('image',file)
      setUploading(true)
      try {
          const config={
            headers:{
              'Content-Type':'multipart/form-data'
            }
          }
          const {data}=await axios.post(`/Api/upload`,formData,config)
          setImage(data)
          setUploading(false)
      } catch (error) {
        console.error(error);
        setUploading(false)
        
      }
  }
  

    
  return (
    <>
    <Link to={`/admin/productlist`} className='btn btn-light mv-3'>Go Back</Link>
    
   <FormContainer>
        <h1>Edit Products </h1>
        {loadingUpdate&&<Loader/>}
        {errorUpdate&&<Message variant='danger'>{errorUpdate}</Message>}
        
        {loading ?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
      
            <Form.Group  controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>(setName(e.target.value))}/>
               
              </Form.Group>

              <Form.Group  controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Enter Image" value={image} onChange={(e)=>(setImage(e.target.value))}/>
               
              <Form.Control  type='file' label='choose file' custom onChange={uploadFileHandler}/>
               
                {uploading&&<Loader style={{color:'red'}}/>}
                </Form.Group>
              <Form.Group  controlId="price">
                <Form.Label>Price </Form.Label>
                <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e)=>(setPrice(e.target.value))}/>
               
              </Form.Group>

              
              <Form.Group  controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e)=>(setBrand(e.target.value))}/>
               
              </Form.Group>

              <Form.Group  controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" row='3' placeholder="Enter description" value={description} onChange={(e)=>(setDescription(e.target.value))}/>
               
              </Form.Group>
              <Form.Group  controlId="countInStock">
                <Form.Label>CountInStock</Form.Label>
                <Form.Control type="number" placeholder="Enter countInStock" value={countInStock} onChange={(e)=>(setCountInStock(e.target.value))}/>
               
              </Form.Group>
              <Form.Group  controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e)=>(setCategory(e.target.value))}/>
               
              </Form.Group>
                           
              <Button variant="dark" type="submit">
                UPDATE  
              </Button>
            </Form>
        )} 
    </FormContainer>
    
   </>
   
  )
}

export default ProductEditScreen;
