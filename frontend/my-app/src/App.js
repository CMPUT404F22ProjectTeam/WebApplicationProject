import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/home/homePage';
import WorldPage from './views/worldPage';
import MessagePage from './views/messagePage';
import FriendPage from './views/FriendPage';
import Post from './views/Post'
import "bootstrap/dist/css/bootstrap.min.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< HomePage />}></Route>
        <Route exact path='/world' element={< WorldPage />}></Route>
        <Route exact path='/message' element={< MessagePage />}></Route>
        <Route exact path='/friend' element={< FriendPage />}></Route>
        <Route exact path='/Post' element={< Post />}></Route>
        {/* <Route path="/authors/:author_id/posts" element={< Post />} /> */}
      </Routes>
    </Router>

  );
}




