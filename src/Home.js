import { useContext } from 'react'
import { UserAuth } from './Context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {GrUserWorker} from 'react-icons/gr'
import {ImUserTie} from 'react-icons/im'
import {FcShop} from 'react-icons/fc'
import {CgLogOut} from 'react-icons/cg'
import {  Button,Avatar } from '@mui/material'
import { Carts } from './Context/Context'
import ProfileAvatar from './Components/ProfileAvatar'

const Home = () => {

  const Globalstate=useContext(Carts)
  const state = Globalstate.state;
  
  const vendor=Globalstate.singleVendor;

  const { user,logout } = UserAuth();
    const navigate=useNavigate()
   
    // const query = collection(db, `customer/${user.uid}/order`);
    // const [docs, loading, error] = useCollectionData(query);


    


    const Admin_ID='Hh2Z02YOdegdLyiRAurGkqeO5xm2';
   
    // const filterData=vendor.filter((data)=>{
    //   return user.uid?.includes(data.details.id)
    // })
    // const vendor_id=JSON.stringify(filterData.map((data)=>data.details.id));
console.log(user.uid === vendor?.details?.id);
    // console.log('id', vendor_id);

   
 
  // console.log('aaa',user.uid);
  // console.log(user.uid === Admin_ID ? 'hello' : 'hi')
    return (
    <div>
     <h1 className='text-center text-3xl font-bold mb-7'>SHOPPING CART
           </h1>
           <div className='d-flex justify-content-end me-5'>
            {/* <Button onClick={()=>console.log('some')}>
           <Avatar sx={{ width: 36, height: 36 }} />
           </Button> */}
           <ProfileAvatar />
           </div>
    <div className='homepage'>
    
    { user.uid === Admin_ID ? 
    <>
     <Link className='text-decoration-none' to='/read'><Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
        startIcon={<GrUserWorker color='red' />}
      > Employee Details
      </Button></Link>
      
    <Link className='text-decoration-none' to='/customer'><Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
        startIcon={<ImUserTie  />}
      > Customer Details
      </Button></Link></> 
     : null } 


      <Link className='text-decoration-none' to='/items'><Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'11rem'}}}
        variant="contained"
        startIcon={<FcShop />}
      > Product Details
      </Button></Link>
      {/* { user.uid !== vendor?.details?.id &&
      <Link className='text-decoration-none' to='/orders'><Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'11rem'}}}
        variant="contained"
        startIcon={<FcShop />}
      > order details
      </Button></Link>} */}
      { user.uid !== vendor?.details?.id &&
      <Link className='text-decoration-none' to='/create'><Button 
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'10rem',md:'10rem',lg:'12rem'}}}
        variant="contained"
        startIcon={<ImUserTie  />}
      > Become a Seller
      </Button></Link>  }
    
         </div>
         <div className=' d-flex justify-content-center align-items-center g-2 mt-5'>
         <p>User Email<p className='text-success'> {user.email}</p></p>
</div>
<div>
 
 
</div>
         </div>
  )
}

export default Home