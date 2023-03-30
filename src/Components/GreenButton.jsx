import React from 'react'
import { Button } from '@mui/material'

const GreenButton = () => {
  return (
    <div>
        <Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
      >
    
      </Button>
    </div>
  )
}

export default GreenButton