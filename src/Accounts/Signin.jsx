import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user,signIn } = UserAuth();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
    window.localStorage.setItem('user',true)
       navigate('/') 
       console.log('navaiuha');
    } 
    catch (e) {
      setError(e.code)
      console.log('code',e.code)
      if(e.code === 'auth/wrong-password'){
        toast.error('Please check the Password');
      }
      if(e.code === 'auth/user-not-found'){
        toast.error('Please check the Email');
      }
      if(e.code === 'auth/invalid-email'){
        toast.error('Please Enter Valid Email and Password');
      }
      if(e.code === 'auth/internal-error'){
        toast.error('Please Enter Valid Password');
      }
    }
  };

  return (
    <div className="row ">
    <div className="offset-lg-3 col-lg-4" style={{ marginTop: '100px' }}>
        <form onSubmit={handleSubmit} className="container">
          <h4 style={{marginLeft:'8rem'}}>LOGIN</h4>
                        <label className='mt-2'>Email <span className="errmsg">*</span></label>
                        <input onChange={e => setEmail(e.target.value)} placeholder='Email' className="form-control mt-2"></input>
                  
                        <label className='mt-2'>Password <span className="errmsg">*</span></label>
                        <input type="password"  onChange={e => setPassword(e.target.value)} placeholder='Password' className="form-control mt-2"></input>
                 
          
          <button type="submit" className="btn btn-primary col-5 mt-4" data-mdb-ripple-color="dark">Login</button>
                    <Link to='/signup'><button type="button" className="btn btn-success col-5 ms-4 mt-4" data-mdb-ripple-color="dark">New User</button></Link>
                    
        </form>
    </div>
    <ToastContainer />
</div>
        
  );
};

export default Signin;