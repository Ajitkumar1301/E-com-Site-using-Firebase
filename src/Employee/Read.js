import { Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material'

import React, { useEffect } from 'react'
import { useState } from 'react'

import { useNavigate,Link } from 'react-router-dom'
import {collection, query,doc,deleteDoc, onSnapshot} from "firebase/firestore"
import { db } from '../firebase-config'
import {TiUserAdd} from 'react-icons/ti'
import {IoHomeSharp} from 'react-icons/io5'


const Read = () => {
    const navie=useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navie('/')
    }
   
    const[content,setContent]=useState([])
const navigate=useNavigate()
   


const deleteUser=async(id)=>{
    await deleteDoc(doc(db, "employee", id));
}


const updateUser=async({id,details})=>{
// console.log('details',details)
    localStorage.setItem('id',id)
    localStorage.setItem('details',JSON.stringify(details))
    // localStorage.setItem('age',age)
    // localStorage.setItem('address',address)
    // localStorage.setItem('pno',pno)
    // localStorage.setItem('sal',sal)
   navigate('/update')
}



useEffect(() => {
    const q = query(collection(db, "employee"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let empArray = [];
      querySnapshot.forEach((doc) => {
        empArray.push({ ...doc.data(), id: doc.id });
      });
     
      setContent(empArray);
    });
    return () => unsub();
  }, []);
  console.log('content',content)

  return (
    <div>
          <h1 className='text-center text-3xl font-bold mb-5'>Employee Details
           </h1>
          <div className='homebtn'>
      <div>
      <Link className='text-decoration-none' to='/create'>
      <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'10rem',sm:'8.3rem',md:'10rem',lg:'12rem'} }}
        variant="contained"
        startIcon={<TiUserAdd />}
      > ADD New Employee
      </Button>
         </Link></div>
      <Link className='text-decoration-none' to='/'>    <Button
        sx={{ borderRadius: 10,backgroundColor:'darkcyan',fontSize:{xs:'10px',sm:'8px',md:'10px',lg:'13px'},
        width:{xs:'5rem',sm:'5rem',md:'10rem',lg:'5rem'} }}
        variant="contained"
        startIcon={<IoHomeSharp />}
      > Home
      </Button></Link>
      <Link to='/Update'></Link>
      <Link to='/'></Link>

      </div>
        <Table style={{width:'750px'}}  className='table'>
            <TableHead>
                <TableRow>
                    {/* <TableCell>Employee ID</TableCell> */}
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Num</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
              {content.length > 0 ?
            (content.map((data)=>
            <TableRow key={data.id}>
              {/* <TableCell>{data.id}</TableCell> */}
              <TableCell>{data.details.name}</TableCell>
              <TableCell>{data.details.age}</TableCell>
              <TableCell>{data.details.address}</TableCell>
              <TableCell>{data.details.pno}</TableCell>
              <TableCell>{data.details.sal}</TableCell>
              <TableCell><Button sx={{borderRadius: 3,backgroundColor:'beige',color:'lightcoral',fontSize:'10px',fontWeight:'900'}}  onClick={()=>updateUser(data)}>Update</Button></TableCell>
              <TableCell><Button sx={{borderRadius: 3,backgroundColor:'beige',color:'lightcoral',fontSize:'10px',fontWeight:'900'}}  onClick={()=>deleteUser(data.id)} >Delete</Button></TableCell>
            </TableRow>)) :
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

export default Read