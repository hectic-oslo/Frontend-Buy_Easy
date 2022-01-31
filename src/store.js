import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopReducer,} from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducer'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './Reducers/userReducer'
import { orderCreateReducer ,orderDeliverReducer,orderDetailsReducer,orderListReducer,orderMyListReducer,orderPayReducer} from './Reducers/orderReducers'

const reducer=combineReducers({
    productDetails:productDetailsReducer,
    productList:productListReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productCreateReview:productCreateReviewReducer,
    productTop:productTopReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderMyList:orderMyListReducer,
    orderList:orderListReducer,//admin
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

})


const cartItemsFromLocalStorage= localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null


const shippingAddressFromLocalStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}

const paymentMethodFromLocalStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}

const initialState={
    cart:{cartItems:cartItemsFromLocalStorage,
          shippingAddress:shippingAddressFromLocalStorage,
          paymentMethod: paymentMethodFromLocalStorage
    },
    userLogin:{userInfo:userInfoFromLocalStorage}
}  
const middleware=[thunk]

const store= createStore(
    reducer,
    initialState,
     composeWithDevTools(applyMiddleware(...middleware))
)


export default store