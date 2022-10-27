import React from 'react'
import './home/homePage.css'
import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div >
            <Link to={`./editProfile`} className="editProfile">Edit</Link>
            <img class='profileimg' src={require("../public/profile.jpg")} alt="profile" width="100px" height="100px" />
            <p className='name'>Hello</p>
            <p className='name'>404 User</p>
            <p className='name'>Github: sos</p>
        </div>
    );
}
