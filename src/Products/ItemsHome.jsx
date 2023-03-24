import {  useContext,useState,useEffect } from 'react';
import SingleCard from './SingleCard'
import { Link,useNavigate } from 'react-router-dom';
import { Carts, CartState } from '../Context/Context';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import Badge from '@mui/material/Badge';
import './Items.css'
import { UserAuth } from '../Context/AuthContext';
import {IoChevronBackCircle } from 'react-icons/io5'
import {CgLogOut} from 'react-icons/cg'
import {BiCartAdd} from 'react-icons/bi'
import { Button } from '@mui/material';
import axios from 'axios';
import "./itemsHome.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions,CardMedia } from '@mui/material';


const ItemsHome = () => {
 
  const Globalstate=useContext(Carts)
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  console.log(Globalstate);

  const [data, setdata] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setdata(response.data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  
 
 
  const Admin_ID='Hh2Z02YOdegdLyiRAurGkqeO5xm2';
  const { user,logout } = UserAuth();
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      await logout();
      state.length = 0;
      localStorage.clear()
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
    
  
    
    

  return (
    <div>
       <h1 className='text-center text-3xl font-bold mb-5'>Product Details
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

      {  user.uid === Admin_ID ?
         <Link className='text-decoration-none' to='/add'>
         <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'8.3rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
        endIcon={<BiCartAdd color='orange' />}
      > ADD New Product
      </Button>
         </Link> : null }
         <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'6rem',md:'10rem',lg:'6rem'} }}
        variant="contained"
        onClick={handleLogout}
        endIcon={<CgLogOut color='red' />}
      > Logout
      </Button>
        
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
   </Link>
    
      </div>
      
  
      <div className="home">
      {data.map((item, index) => {
       
        item.quantity = 1;
        return (
        <SingleCard item={item} prod={data} />
        );
      })}
    </div>
    </div>
  )
}

export default ItemsHome