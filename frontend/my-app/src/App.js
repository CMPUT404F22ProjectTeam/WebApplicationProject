import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home'
import Login from './views/Login';
import Signup from './views/Signup';
import "bootstrap/dist/css/bootstrap.min.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/home' element={< Home />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
      </Routes>
    </Router>
  );
}




