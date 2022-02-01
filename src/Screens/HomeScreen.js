import {Row,Col,Container}from 'react-bootstrap'
import MetaTags from '../components/MetaTags'
import Product from '../components/Product'
import Loader from '../components/loader'
import Message from '../components/message'
import Paginate from '../components/Paginate'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productAction'
import { useParams} from "react-router-dom";
import ProductCarousel from '../components/ProductCarousel'
import React from 'react'

const HomeScreen = () => {
     
     const dispatch = useDispatch()   
    const {keyword,pageNumber}=useParams() 
    
    const productList=useSelector(state=>state.productList)
    const {loading,error,products,pages,page}=productList
    useEffect(()=>{
            dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])
     
    return (
        <>
        <MetaTags title="Welcome to Buy-Easy | Home"/>
        {!keyword&&<ProductCarousel/>}
           <Container>
           <h2>Latest Products</h2>
            {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<Row>
                {products.map((product)=>(
                    <Col sm={12} md={6} lg={4} xl={4}
                     key={product._id}>
                     
                      <Product product={product}/>
                      
                    </Col>
                ))}
            </Row>}
           </Container>
           <Paginate pages={pages} page={page} keyword={keyword?keyword:''}/>
        </>
    )
}

export default HomeScreen