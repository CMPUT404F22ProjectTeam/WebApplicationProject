import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/homePage';
import WorldPage from './views/worldPage';
import "bootstrap/dist/css/bootstrap.min.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< HomePage />}></Route>
        <Route exact path='/world' element={< WorldPage />}></Route>
      </Routes>
    </Router>

  );
}




