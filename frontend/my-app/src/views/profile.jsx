import React from 'react'
import { useNavigate } from "react-router-dom";
import './home/homePage.css'
export default function Profile() {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate("/editProfile")
    }
    return (
        <div >
            <button className="editProfile" disabled={window.location.pathname === '/Post'} onClick={handleEdit}>Edit</button>
            <img class='profileimg' src={require("../public/profile.jpg")} alt="profile" width="100px" height="100px" />
            <p className='name'>Hello</p>
            <p className='name'>404 User</p>
            <p className='name'>Github: sos</p>
        </div>
    );
}
