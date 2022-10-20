import React from 'react'
import Home from './views/Home'
import Login from './views/Login';
import Signup from './views/Signup';
import "bootstrap/dist/css/bootstrap.min.css";


const showLogin = () => {
  if (window.location.pathname === "/") {
    return <Login />
  }
}

const showSignUP = () => {
  if (window.location.pathname === "/signup") {
    return <Signup />
  }
}

const showHome = () => {
  if (window.location.pathname === "/home") {
    return <Home />
  }
}

export default function App() {
  return (
    <div className="App">
      {showLogin()}
      {showHome()}
      {showSignUP()}
    </div>
  );
}




