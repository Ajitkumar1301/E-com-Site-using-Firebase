import React, { useState } from 'react'
import { Container,TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase-config';
import {collection, addDoc,setDoc,doc} from 'firebase/firestore'
import { UserAuth } from '../Context/AuthContext';


const CustomerAdd = () => {
const navigate=useNavigate()
const { user,signIn } = UserAuth();
// console.log('details',user)
// console.log('details',user.uid)


const[details,setDetails]=useState({
  name:"",
  address:"",
  pno:"",
  city:"",
  sta:"",
  zip:"",
})

const limitChar = 10;

const postData=async(e)=>{
 const customerRef=doc(db, 'customer',user.uid)
  e.preventDefault()
  try {
    await setDoc(customerRef, {
      details:details,
    },  navigate('/'))
  }
  catch (err) {
    alert(err)
  }
}    
 
       

const handleChange = (e) => {
  const {name,value}=e.target;
 
  setDetails((prev)=>{
    return {...prev,[name]:value};
  })
};

  return (
    <div className='create'>
         <form onSubmit={postData}>
    <Container
    sx={{
      '& > :not(style)': { m: 2, width: '35ch', },
    }}
   
  >
    <TextField required type="text" color='warning' label="Name"name='name'  variant="outlined" onChange={handleChange}/>
    <TextField required type="number" color='warning' label="Phone No"name='pno' variant="outlined"    onChange={handleChange}/>
    <TextField required type="text" color='warning' label="Address" name='address' variant="outlined"  onChange={handleChange}/>
    <TextField required type="text" color='warning' label="State"name='sta' variant="outlined"  onChange={handleChange}/>
    <TextField required type="text" color='warning' label="City"name='city' variant="outlined" onChange={handleChange}/>
    <TextField required type="number" color='warning' label="Zip Code"name='zip' variant="outlined"  onChange={handleChange}/>
    <div className='d-flex justify-content-between'>
    <button className="btn btn-primary add">
ADD Employee</button>
    <Link  to='/'><button className='btn btn-danger cancel'>
      Cancel</button></Link></div>
  </Container>
</form>
  </div>
  )
}

export default CustomerAdd