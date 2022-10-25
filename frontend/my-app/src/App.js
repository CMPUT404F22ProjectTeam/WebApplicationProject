import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/homePage';
import WorldPage from './views/worldPage';
import MessagePage from './views/messagePage';
import "bootstrap/dist/css/bootstrap.min.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< HomePage />}></Route>
        <Route exact path='/world' element={< WorldPage />}></Route>
        <Route exact path='/message' element={< MessagePage />}></Route>
      </Routes>
    </Router>

  );
}




