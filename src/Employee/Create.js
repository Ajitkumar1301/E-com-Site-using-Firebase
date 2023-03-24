import React, { useState } from 'react'
import { Container,TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase-config'
import {collection, addDoc} from 'firebase/firestore'


const Create = () => {
const navigate=useNavigate()
const[details,setDetails]=useState({
  name:"",
  age:"",
  address:"",
  sal:"",
  pno:"",
})
 

const postData=async(e)=>{
  e.preventDefault()
  try {
    await addDoc(collection(db, 'employee'), {
      details:details
    },  navigate('/read'))
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
      '& > :not(style)': { m: 2, width: '30ch', },
    }}
   
  >
    
    <TextField required type="text" color='warning' label="Name"  variant="outlined" name='name' onChange={handleChange} />
    <TextField required type="number" color='warning' label="Age" variant="outlined" name='age' onChange={handleChange}/>
    <TextField required type="number" color='warning' label="Phone No"  variant="outlined"  name='pno' onChange={handleChange}/>
    <TextField required type="text" color='warning' label="Address" variant="outlined" name='address' onChange={handleChange}/>
    <TextField required type="number" color='warning' label="Salary" variant="outlined" name='sal' onChange={handleChange}/>
   
   
    <div className='d-flex justify-content-between'>
    <button className="btn btn-primary add">
ADD Employee</button>
    <Link  to='/read'><button className='btn btn-danger cancel'>
      Cancel</button></Link></div>
  </Container>
  </form>
  </div>
  )
}

export default Create