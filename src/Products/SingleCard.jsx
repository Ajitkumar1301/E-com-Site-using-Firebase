import {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button,  CardActions } from '@mui/material';
import {  Carts} from '../Context/Context';
import { UserAuth } from '../Context/AuthContext';

export default function SingleCard({item,some,prod}) {
   
  const Globalstate=useContext(Carts)
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const vendor= Globalstate.singleVendor;
  const { user } = UserAuth();
  // console.log(Globalstate);
 
//  console.log(item.id);
  //  console.log(Object.keys(vendor.details).length);
  return (

    <div className='products'>
    <Card sx={{ maxWidth: 285,backgroundColor:'whitesmoke' }}>
       {/* <CardMedia
         component="img"
         alt="/"
         sx={{width:'10rem',height:'13rem',marginLeft:'3rem',marginTop:'0.5rem'}}
         image={item.image}
       /> */}
       <CardContent>
         <Typography gutterBottom sx={{fontSize:'13px',fontWeight: 'bold'}} component="div">
           {item.products.iname}
         </Typography>
         <Typography variant="body2">
         <span className='fw-bolder'>Price:</span><span className="fw-bolder text-success">  ₹ {(item.products.price)}</span>
         </Typography>
       
         <Typography variant="body2">
         <span className='fw-bolder'>Quantity:</span><span className="fw-bolder text-success">{item.quantity}</span>
         </Typography> 
         
       <Typography  sx={{
       overflow: 'hidden',
       textOverflow: 'ellipsis',
       display: '-webkit-box',
       WebkitLineClamp: '2',
       WebkitBoxOrient: 'vertical',
    }} variant="body2">
        <span className='fw-bolder'>Product Details:</span><br></br>
         {item.products.desc}
         </Typography>
       </CardContent>
       <CardActions>
       {(user.uid !== vendor?.details?.id && !some)  &&
         <div className='d-flex justify-content-center align-items-center w-100'>
       
       {state.some((p) => p.id === item.id) ? (
       <Button size="small"
       variant="contained"
       color="error"
       onClick={() => dispatch({ type: "REMOVE", payload: item })}
      >
            Remove from cart
           </Button> ):
             <Button size="small"  variant="contained" color='success'
           onClick={() => dispatch({ type: "ADD", payload: item })}
          > 
                Add to cart
               </Button>}
               </div> }
       </CardActions>
     </Card>
     </div>
  );
}
