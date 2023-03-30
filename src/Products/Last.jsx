import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoHomeSharp} from 'react-icons/io5'
import { Carts } from '../Context/Context'


const Last = () => {
  const Globalstate=useContext(Carts)
  const state = Globalstate.state;
    const Navigate=useNavigate()

console.log(state);

    const handleHome=()=>{
      state.length=0;
    Navigate('/')
}

  return (
    <div className='last'>
        <h1 className='ms-1'>Thank you!</h1><br></br> 
        <h3>Your Order Got Placed...</h3>
        <h5>Keep Shopping With Us</h5>
       <Button 
       className='mt-5'
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'5rem',md:'10rem',lg:'5rem'}}}
        variant="contained"
        startIcon={<IoHomeSharp/>}
        onClick={handleHome}
      > Home
      </Button>
      
    </div>
  )
}

export default Last