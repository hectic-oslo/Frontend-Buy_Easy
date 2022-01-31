import React, { useState, useEffect } from "react";
import FormContainer from "../components/formContainer";
import {Form ,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails ,updateUser} from "../Actions/userAction";
import Message from "../components/message";
import Loader from "../components/loader";
import {useNavigate } from "react-router";
import { useParams } from "react-router";
import { USER_UPDATE_RESET } from "../Constants/userConstants";
 
const UserEditScreen = () => {
 const {id:userId}=useParams()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  
   const navigate=useNavigate()
   const dispatch=useDispatch()

  const userDetails=useSelector(state=>state.userDetails)
  const {loading,user,error}=userDetails

  const userUpdate=useSelector(state=>state.userUpdate)
  const {loading:loadingUpdate,success:successUpdate,error:errorUpdate}=userUpdate

  useEffect(()=>{
      if(successUpdate)
      {
          dispatch({type:USER_UPDATE_RESET})
          navigate(`/admin/userlist`)
      }
      else{
        if(!user.name||user._id!==userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
      }
      
  },[dispatch,user,userId,successUpdate,navigate])

  
  const submitHandler=(e)=>{ 
    e.preventDefault() 
   
          dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }
    
  return (
    <>
    <Link to={`/admin/userlist`} className='btn btn-light mv-3'>Go Back</Link>
    
   <FormContainer>
        <h1>Edit User </h1>
        {loadingUpdate&&<Loader/>}
        {errorUpdate&&<Message variant='danger'>{errorUpdate}</Message>}
        
        {loading ?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
      
            <Form.Group  controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>(setName(e.target.value))}/>
               
              </Form.Group>
      
              <Form.Group  controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>(setEmail(e.target.value))}/>
               
              </Form.Group>
      
              <Form.Group controlId="isAdmin">
                <Form.Check type='checkbox' label='Is Admin'  checked={isAdmin} onChange={(e)=>(setIsAdmin(e.target.checked))} />
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

export default UserEditScreen;
