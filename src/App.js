import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductCarousel from './components/ProductCarousel';
import Header from './components/header';
import Footer from './components/footer';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';
import React from 'react'


function App() {

  return (
    <Router>
      
      
       <Header/>
       
       <Container>
       
       <Routes>
         
       <Route exact path='/' element={<HomeScreen/>} />
       <Route path='/product/:id' element={<ProductScreen/>} />
       <Route path='/cart/:id' element={<CartScreen/>} />
       <Route path='/cart' element={<CartScreen/>} />
       <Route path='/login' element={<LoginScreen/>} />      {/* optional /cart/:id? */}
       <Route path='/register' element={<RegisterScreen/>} />
       <Route path='/profile' element={<ProfileScreen/>} />
       <Route path='/shipping' element={<ShippingScreen/>} />
       <Route path='/payment' element={<PaymentScreen/>} />
       <Route path='/placeorder' element={<PlaceOrderScreen/>} />
       <Route path='/order/:id' element={<OrderScreen/>} />
       <Route path='/admin/userlist' element={<UserListScreen/>} />
       <Route path='/admin/users/:id/edit' element={<UserEditScreen/>} />
       <Route path='/admin/productlist' element={<ProductListScreen/>} />
       <Route path='/admin/products/:id/edit' element={<ProductEditScreen/>}/>
       <Route path='/admin/orderlist' element={<OrderListScreen/>} />
       <Route path='/admin/orders/:id' element={<OrderScreen/>}/>
       <Route path='/search/:keyword' element={<HomeScreen/>} />
       <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>} />
       <Route path='/page/:pageNumber' element={<HomeScreen/>} />
       <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>} />



       </Routes>
       </Container>
       <Footer/> 
      
       
    </Router>
  ); 
}

export default App;
