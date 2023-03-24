import {  Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material'
import { useEffect,useContext } from 'react'
import { Carts } from '../Context/Context'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {collection, query,doc,deleteDoc, onSnapshot, getDocs} from "firebase/firestore"
import {db} from '../firebase-config'
import {TiUserAdd} from 'react-icons/ti'
import {IoHomeSharp} from 'react-icons/io5'
import { UserAuth } from '../Context/AuthContext'


const Customer = () => {

  const { user,signIn } = UserAuth();
  const{role,content}=useContext(Carts)  
  const {details,setDetails}=useContext(Carts)
    const navie=useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navie('/')
    }
   
    
const navigate=useNavigate()
   


const deleteUser=async(id)=>{
    await deleteDoc(doc(db, "customers", id));
}


const updateUser=async({id,details})=>{
  localStorage.setItem('id',id)
  localStorage.setItem('details',JSON.stringify(details))
   navigate('/Customerupdate')
}
let userDetails=[];
userDetails.push(role);
console.log(userDetails);

const customerRef=collection(db,"customer")


  
 console.log(...content);
// console.log(content.map((data)=> data.userid === user.uid ? 'hello' : 'hi'))
 
return (
    <div>
           <h1 className='text-center text-3xl font-bold mb-7 '>Customer Portal
           </h1>
          <div className='homebtn'>
      <div>
      <Link className='text-decoration-none' to='/details'>
      <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'8.3rem',md:'10rem',lg:'12rem'} }}
        variant="contained"
        startIcon={<TiUserAdd />}
      > ADD New Customer
      </Button>
      </Link></div>
      <Link className='text-decoration-none' to='/'>
      <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'5rem',md:'10rem',lg:'5rem'} }}
        variant="contained"
        startIcon={<IoHomeSharp />}
      > Home
      </Button>
      </Link>
      <Link to='/cutomerUpdate'></Link>
      </div>
      
       <Table style={{width:'900px'}} className='table'>
            <TableHead>
                <TableRow>
                    {/* <TableCell>Employee ID</TableCell> */}
                    <TableCell>Customer Name</TableCell>   
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Num</TableCell>
                    {/* <TableCell>Email</TableCell> */}
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>ZipCode</TableCell>
                    {/* <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody> 
            
            {content.length > 0 ?
              (content.map((data)=>
              <TableRow key={data.id}>
              {/* <TableCell>{data.id}</TableCell> */}
              <TableCell>{data.details.name}</TableCell>
              <TableCell>{data.details.address}</TableCell>
              <TableCell>{data.details.pno}</TableCell>
            
              <TableCell>{data.details.city}</TableCell>
              <TableCell>{data.details.sta}</TableCell>
              <TableCell>{data.details.zip}</TableCell>
              {/* <TableCell><Button sx={{borderRadius: 3,backgroundColor:'beige',color:'lightcoral',fontSize:'10px',fontWeight:'900'}}  onClick={()=>updateUser(data)}>Update</Button></TableCell>
              <TableCell><Button sx={{borderRadius: 3,backgroundColor:'beige',color:'lightcoral',fontSize:'10px',fontWeight:'900'}}  onClick={()=>deleteUser(data.id)} >Delete</Button></TableCell> */}
            </TableRow>) ):
             ( <TableRow>
             <TableCell colSpan={6} >
              <p className='text-center mt-4 fw-bolder'> No Record Found</p>
             </TableCell>
             </TableRow>
              )
             
            }
            </TableBody>
        </Table>
        </div>
  )
}

export default Customer