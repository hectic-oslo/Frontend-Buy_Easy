import React,{useEffect} from 'react';
import {Link}from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import Loader from './loader'
import Message from './message'
import { topProducts } from '../Actions/productAction';
import {useDispatch, useSelector} from 'react-redux'

const ProductCarousel = () => {

   const dispatch=useDispatch()

   const productTop=useSelector(state=>state.productTop)
   const {loading,error,products}=productTop

   useEffect(()=>{
       dispatch(topProducts())
   },[dispatch])
  return <>
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<>

         <Carousel pause='hover' className='bg-dark'>
          {products.map((product,index)=>(
              <Carousel.Item key={index}  >
               <Link to={`/product/${product._id}`}>
                   <Image src={product.image} alt={product.name} fluid  className="d-block w-45"/> 
                   <Carousel.Caption className='carousel-caption'>
                       <h2>{product.name} (₹{product.price}) </h2>
                       </Carousel.Caption>               
               </Link>
               
              </Carousel.Item>
          ))}
         </Carousel>
        
      </>}
  </>;
};

export default ProductCarousel;
