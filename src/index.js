import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Context from './Context/Context';
import { AuthContextProvider } from './Context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <Context>
    <Router> 
    <App />
    </Router>
    </Context>
    </AuthContextProvider>
  
);

