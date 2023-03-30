import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[role,setRole]=useState('')
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/')
    } catch (e) {
      setError(e.code)
      console.log('code',e.code)
      if(e.code === 'auth/weak-password'){
        toast.error('Please check the Password');
      }
      if(e.code === 'auth/email-already-in-use'){
        toast.error('Email Already In-use Please Use Different Email');
      }
      if(e.code === 'auth/invalid-email'){
        toast.error('Please Enter Valid Email and Password');
      }
      if(e.code === 'auth/internal-error'){
        toast.error('Please Enter Valid Password');
      }
      if(e.code === 'auth/missing-email'){
        toast.error('Please Enter Valid Email');
      }
    }
  };

  return (
    <div className="row ">
    <div className="offset-lg-3 col-lg-4" style={{ marginTop: '100px' }}>
        <form onSubmit={handleSubmit} className="container">
          <h4 style={{marginLeft:'8rem'}}>REGISTER</h4>
                        <label className='mt-2'>Email<span className="errmsg">*</span></label>
                        <input onChange={e => setEmail(e.target.value)} placeholder='Email' className="form-control mt-2"></input>
                  
                        <label className='mt-2'>Password <span className="errmsg">*</span></label>
                        <input type="password"  onChange={e => setPassword(e.target.value)} placeholder='Password' className="form-control mt-2"></input>
                         
                   
                    <button type="submit" className="btn btn-primary col-5 mt-4">Sign-up</button> 
                    <Link to='/'><button type="button" className="btn btn-success col-5 ms-4 mt-4" data-mdb-ripple-color="dark">Login</button></Link>               
        </form>
    </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;