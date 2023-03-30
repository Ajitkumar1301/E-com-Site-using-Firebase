import React from 'react'
import './Profile.css'
import { Avatar,Button, Typography } from '@mui/material'
import { UserAuth } from './Context/AuthContext'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import { IoChevronBackCircle } from 'react-icons/io5'


const Profile = () => {

const {user} =UserAuth();
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
let strDateTime= user?.metadata?.creationTime 
var myDate = new Date(strDateTime);
let createDate=myDate.toLocaleString()

const accDate=moment(createDate).format('Do MMM  YYYY')
  return (
    <>
    <div className='topbtn'>
     <Link to='/' className='text-decoration-none'>
       <Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'5rem',md:'10rem',lg:'5rem'}}}
        variant="contained"
        startIcon={<IoChevronBackCircle />}
      > Back
      </Button>
       </Link>
       </div>
    <div className='propage'>
    
    <span className='heading'>PROFILE DETAILS</span>
    <div className='profile'>
      <div className='avatar'>
    <Avatar sx={{ width: 150, height: 140,fontSize:'100px' ,fontWeight:'600',backgroundColor:'white',color:'#063406' }}>{user?.email?.slice(0, 1).toUpperCase()}</Avatar>
    </div>
    <div className='details'>
    <Typography className='mt-5'>
      USER NAME  <span className='ms-5'> ......</span>
    </Typography>
    <Typography className='mt-5'>
      EMAIL  <span className='ms-5'>{user.email}</span>
    </Typography>
    <Typography className='mt-5'>
      CREATED <span className='ms-5'>{accDate}</span>
    </Typography>
    </div>
    </div>
       
    </div>
    </>
  )
}

export default Profile