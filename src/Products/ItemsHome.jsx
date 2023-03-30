import {  useContext } from 'react';
import SingleCard from './SingleCard'
import { Link,useNavigate } from 'react-router-dom';
import { Carts} from '../Context/Context';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import ProfileAvatar from '../Components/ProfileAvatar'
import './Items.css'
import { UserAuth } from '../Context/AuthContext';
import {IoChevronBackCircle } from 'react-icons/io5'
import {CgLogOut} from 'react-icons/cg'
import {BiCartAdd} from 'react-icons/bi'
import { Button } from '@mui/material';
import "./itemsHome.css";
import MultiselectDrop from '../Components/MultiselectDrop';




const ItemsHome = () => {
 
  const Globalstate=useContext(Carts)
  const state = Globalstate.state;
 
  const vendor= Globalstate.singleVendor;
  const prod= Globalstate.prod;
  const prodName= Globalstate.prodName;
  // console.log(Globalstate.vendor);
//  console.log(prod);
  
 
  
 
 
  const Admin_ID='Hh2Z02YOdegdLyiRAurGkqeO5xm2';
  const { user,logout } = UserAuth();
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      await logout();
      state.length = 0;
    
      prod.length= 0;
      localStorage.clear()
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
  const prodname=JSON.stringify(prodName)
 
  // if (typeof vendor.details !== 'undefined' && vendor.details  !== null && !vendor.details > 0) {
  //   console.log('error');
  // } else {
  //   // 👇️ this runs
  //   console.log('⛔️ Object is falsy');
  // }

  
 const filterData=prod.filter((data)=>{
          return prodname?.includes(data.products.brand)
        })
console.log("filter",filterData.map((data)=>
  data.products.brand
))
console.log(prodname);
  return (
    <div>
      {

      }
    <div className='d-flex justify-content-end me-5'>
           <ProfileAvatar />
           </div>
       <h1 className='text-center text-3xl font-bold mb-3'>Product Details
           </h1>
          
       <div className='headbtn'>
       <Link className='text-decoration-none' to='/'>
       <Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'5rem',md:'10rem',lg:'5rem'}}}
        variant="contained"
        startIcon={<IoChevronBackCircle />}
      > Back
      </Button>
       </Link>

      {  user.uid === Admin_ID || user.uid === vendor?.details?.id ? 
         <Link className='text-decoration-none' to='/add'>
         <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'8.3rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
        endIcon={<BiCartAdd color='orange' />}
      > ADD New Product
      </Button>
         </Link> : null }
      
    
    {user.uid !== vendor?.details?.id &&
         <Link className='text-decoration-none' to='/cart'> 
       
         {/* <Badge badgeContent={carts.length} sx={badgeStyle}> */}
         <Button
        sx={{ borderRadius: 30,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'3rem',sm:'5px',md:'10rem',lg:'5rem'}}}
        variant="contained"
        endIcon={<AiOutlineShoppingCart color='black'/>}
      > Cart
       { state.length > 0 ?
       (<span style={{backgroundColor:'cadetblue'}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
         {state.length} </span>)  : null
}
      </Button>
    {/* </Badge> */}
   </Link> }

      </div>
      <div className='headbtn mt-4'>
     
     <MultiselectDrop />
   
     </div>
      <div className="home">
     
     { !filterData.length > 0 ?
      prod.map((data,i)=>{
       
        data.quantity = 1;
        return (
        <SingleCard item={data} key={i} prod={prod} />
        );
      })
      : 
      filterData.map((data,i)=>{
       
        data.quantity = 1;
        return (
        <SingleCard item={data} key={i} prod={prod} />
        );
      })
      
      }
    </div>
    </div>
  )
}

export default ItemsHome