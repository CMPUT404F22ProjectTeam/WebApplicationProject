import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './views/home/homePage';
import WorldPage from './views/world/worldPage';
import MessagePage from './views/message/messagePage';
import FriendPage from './views/friend/FriendPage';
import Post from './views/home/Post'
import EditProfile from './views/home/editProfile';
import OtherUserPage from './views/world/otherUserPage'
import Login from './views/login/Login';
import Signup from './views/login/Signup';
import SharePost from './views/world/sharePost';
import { AuthProvider } from "./components/AuthContext";
//React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Declaring routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signup",
    element: < Signup />,
  },
  {
    path: "home",
    element: < HomePage />,
    errorElement: <HomePage />,
  },
  {
    path: "world",
    element: < WorldPage />,
  },
  {
    path: "message",
    element: < MessagePage />,
  },
  {
    path: "friend",
    element: < FriendPage />,
  },
  {
    path: "post",
    element: < Post />,
  },
  {
    path: "editProfile",
    element: < EditProfile />,
  },
  {
    path: "otherProfile",
    element: < OtherUserPage />,
  },

  {
    path: "sharePost",
    element: < SharePost />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
