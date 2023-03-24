import {useEffect,useState,useContext} from 'react'
import { db } from '../firebase-config'
import { collection,getDocs,query,onSnapshot } from 'firebase/firestore'
import { Carts } from '../Context/Context'
import { UserAuth } from '../Context/AuthContext'
import {  Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material'
import SingleCard from './SingleCard'
import { Link, useNavigate } from 'react-router-dom'
import { IoChevronBackCircle } from 'react-icons/io5'
import { CgLogOut } from 'react-icons/cg'

const Orders = () => {

    const {role}=useContext(Carts)
    const { user,logout } = UserAuth();
      const navigate=useNavigate()
      const [workData, setWorkData] = useState([])

      const handleLogout = async () => {
        try {
          await logout();
          localStorage.clear()
          navigate('/');
          console.log('You are logged out')
        } catch (e) {
          console.log(e.message);
        }
      };
      
    useEffect(() => {
        const q = query(collection(db, `customer/${user.uid}/order`));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let empArray = [];
          querySnapshot.forEach((doc) => {
            empArray.push({ ...doc.data(), id: doc.id });
          });
         
          setWorkData(empArray);
        });
        return () => unsub();
      }, [user]);
      console.log('content',workData)


  return (
    <div>
        <h1 className='text-center'>Order Details</h1>
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
       <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'6rem',md:'10rem',lg:'6rem'} }}
        variant="contained"
        onClick={handleLogout}
        endIcon={<CgLogOut color='red' />}
      > Logout
      </Button>
       </div>
       {
    workData.map((data)=>{
     data?.order?.map((da)=>
     console.log('sasa',da)
     )
    })
  }
     <div className='home'>
        {workData.length > 0 ?
              (workData.map((data)=>
              data?.order?.map((da)=>
        <SingleCard item={da} some={workData}/> 
              )) ): <p>No items orderd</p>
}
</div>
        </div>
  )
}

export default Orders