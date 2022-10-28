import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './home/homePage.css'
import axios from "axios";

export default function Profile() {
    const AUTHOR_ID = "111";
    const base_url = "http://127.0.0.1:8000";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [github, setGithub] = useState('');
    const handleEdit = () => {
        navigate("/editProfile")
    }

    axios
        .get(`${base_url}/authors/${AUTHOR_ID}`)
        .then((data) => {
            console.log(data)
            setName(data.displayName)
            setProfile(data.Github)
            setGithub(data.ProfileImage)
        })
        .catch((e) => console.log(e));

    return (
        <div >
            <button className="editProfile" disabled={window.location.pathname === '/Post'} onClick={handleEdit}>Edit</button>
            <img class='profileimg' src={require("../public/profile.jpg")} alt="profile" width="100px" height="100px" />
            <p className='name'>Hello</p>
            <p className='name'>{name}</p>
            <p className='name'>Github: {github}</p>
        </div>
    );
}