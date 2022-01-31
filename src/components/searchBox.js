import React,{useState} from 'react';
import { Button,Form } from 'react-bootstrap';
import { useNavigate } from "react-router";

const SearchBox = () => {

    const [keyword,setKeyword]=useState('')
  
  const navigate=useNavigate()
  
    const submitHandler=(e)=>{
     
      e.preventDefault();
      if(keyword.trim()){
        navigate(`/search/${keyword}`)
      }
      else
      {
          navigate(`/`)
      }
    }
  return <>
   <Form  inline="true" >
       <Form.Control
        type='text' name='search' 
        vlue={keyword} className='mr-sm-2 ml-sm-5' 
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search Products' >
    </Form.Control>  

   </Form>
   <Button type='button' onClick={submitHandler} variant='outline-success'className='p-2 btn-sm'>Search</Button>

    </>;
};

export default SearchBox;
