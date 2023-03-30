import React from 'react';
import Signin from './Accounts/Signin'
import Signup from './Accounts/Signup';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import ProtectedRoute from './Accounts/ProtectedRoute';
import Home from './Home'
import './App.css'
import ItemsHome from './Products/ItemsHome'
import Cart from './Products/Cart'
import Items from './Products/Items'
import CustomerAdd from './Customer/CustomerAdd'
import Customer from './Customer/Cutomer';
import Read from './Employee/Read'
import Create from './Employee/Create'
import Update from './Employee/Update'
import CustomerUpdate from './Customer/CustomerUpdate';
import { UserAuth } from './Context/AuthContext';
import Last from './Products/Last';
import Orders from './Products/Orders';
import Seller from './Employee/Seller';
import GreenButton from './Components/GreenButton';
import Profile from './Profile'

function App() {
 
const {user} = UserAuth()
  
 

const Admin_ID='Hh2Z02YOdegdLyiRAurGkqeO5xm2';
  

  return (    
    <div className='App'>
      
        <Routes>
          <Route path='/' element={user ? <Home/> : <Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/items' element={  <ProtectedRoute> <ItemsHome /> </ProtectedRoute>}></Route>
          <Route path='/cart' element={ <ProtectedRoute><Cart /> </ProtectedRoute>}></Route>
          <Route path='/add' element={ <ProtectedRoute> <Items />  </ProtectedRoute>}></Route>
            <Route path='/details' element={  <ProtectedRoute><CustomerAdd /></ProtectedRoute> }></Route>
            <Route path='/customer' element={<ProtectedRoute><Customer /></ProtectedRoute>}></Route>
            <Route path='/customerupdate' element={<ProtectedRoute><CustomerUpdate /></ProtectedRoute>}></Route>
            <Route path='/read' element={<ProtectedRoute><Read /></ProtectedRoute>}></Route>
            <Route path='/create' element={<ProtectedRoute><Create /></ProtectedRoute>}></Route>
            <Route path='/last' element={<ProtectedRoute><Last /></ProtectedRoute>}></Route>
            <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>}></Route>
            <Route path='/seller' element={<ProtectedRoute><Seller /></ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path='/update' element={<Update />} ></Route>
        </Routes>
     </div>
   
  );
}

export default App;