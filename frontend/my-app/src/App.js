import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './views/Layout';
import Home from './views/Home'
import Login from './views/Login';
import Signup from './views/Signup';
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




