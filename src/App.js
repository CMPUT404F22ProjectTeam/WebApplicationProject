import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/home/homePage';
import WorldPage from './views/world/worldPage';
import MessagePage from './views/message/messagePage';
import FriendPage from './views/friend/FriendPage';
import Post from './views/home/Post'
import EditProfile from './views/home/editProfile';
import OtherUserPage from './views/world/otherUserPage'
import Login from './views/login/Login';
import Signup from './views/login/Signup';
import "bootstrap/dist/css/bootstrap.min.css";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>

        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/home' element={< HomePage />}></Route>
        <Route exact path='/world' element={< WorldPage />}></Route>
        <Route exact path='/message' element={< MessagePage />}></Route>
        <Route exact path='/friend' element={< FriendPage />}></Route>
        <Route exact path='/home/Post' element={< Post />}></Route>
        <Route path="/authors/:author_id/posts" element={< Post />} />
        <Route path="/authors/:author_id" element={< HomePage />} />
        <Route exact path='/editProfile' element={< EditProfile />}></Route>
        <Route exact path='/otherProfile' element={< OtherUserPage />}></Route>
        <Route exact path='/world/otherProfile' element={< OtherUserPage />}></Route>
        <Route exact path='/message/otherProfile' element={< OtherUserPage />}></Route>
        <Route exact path='/friend/otherProfile' element={< OtherUserPage />}></Route>
      </Routes>
    </Router>

  );
}




