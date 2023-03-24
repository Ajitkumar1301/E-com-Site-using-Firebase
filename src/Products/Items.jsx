import React, { useState } from 'react'
import { TextField,InputAdornment,IconButton,Button } from '@mui/material'
import { db } from '../firebase-config';
import {collection, addDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import './Items.css'
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
const Items = () => {
const navigate=useNavigate()
  const[iname,setIname]=useState()
  const[price,setPrice]=useState()
  const[desc,setDesc]=useState()
  const[type,setType]=useState()
 
  const postData=async(e)=>{
    e.preventDefault()
 
    try {
      await axios.post( 'https://fakestoreapi.com/products',{
        title:iname,
        price:price,
        description:desc,
        category:type,
       },  navigate('/items'))
    }
    catch (e) {
      if(e.code === 'invalid-argument')
      console.log('ajith',e.code)
    }
  }    

  return (
    <div className='additems'>
      <form onSubmit={postData}>
      <div className='flex flex-col py-4'>
        <TextField
          id="standard-multiline-flexible"
          label="Item Name"
          multiline
          maxRows={4}
          variant="standard"
          required
          onChange={(e)=>setIname(e.target.value)}
          
        />
        </div>
        <div className='flex flex-col py-4'>
        <TextField select label="Item Type" sx={{ minWidth: 180 }} required   onChange={(e)=>setType(e.target.value)}>
          <MenuItem  value="men's clothing">men's clothing</MenuItem>
          <MenuItem  value='Fashion'>Fashion</MenuItem>
          <MenuItem  value='Electronics'>Electronics</MenuItem>
          <MenuItem  value='Fruits'>Fruits</MenuItem>
          <MenuItem  value='Vegetable'>Vegetable</MenuItem>
          </TextField>
        </div>
        <div className='flex flex-col py-4'>
         <TextField
          id="standard-multiline-flexible"
          type='number'
          label="Item Price"
          variant="standard"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
            <IconButton onClick={()=>0}>₹</IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e)=>setPrice(e.target.value)}
        />
</div>
<div className='py-4'>
     <TextField
          id="outlined-multiline-static"
          label="Item Description"
          multiline
          rows={4}
          required
          onChange={(e)=>setDesc(e.target.value)}
        />
        </div>
         <button  style={{backgroundColor:'cadetblue',color:'aliceblue',border:'2px solid cadetblue'}} variant='contained'>ADD Item details</button>
         <div className='mt-2'>
          <Link className='text-decoration-none' to='/items'><Button sx={{backgroundColor:'cadetblue',color:'aliceblue'}} variant='contained'>Cancel</Button></Link>
          </div>
         </form>
        
        </div>
  )
}

export default Items