import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './homePage.css'

import axios from "axios";

const base_url = process.env.REACT_APP_CURRENT_URL;

export default function Profile() {
    const AUTHOR_ID = "1111111111";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [github, setGithub] = useState('');
    const [activity, setActivity] = useState('');
    const handleEdit = () => {
        navigate("/editProfile")
    }

    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/`)
            
            .then((data) => {
                setName(data.data.displayName)
                setProfile(data.data.profileImage)
                setGithub(data.data.github)
            })
            .catch((e) => console.log(e));
    }, [name, profile, github])
    useEffect(() => {
        axios
            .get(`https://api.github.com/users/${github}/events`)
            
            .then((data) => {
                setName(data.data.activity)
            })
            .catch((e) => console.log(e));
    }, [activity])

    return (
        <div className="home">
            <div className='container'>
            <button className="btn" disabled={window.location.pathname === '/Post'} onClick={handleEdit}>Edit</button>
            <div className="profileImgDiv">
                <img class='profileimg' src={require("./../../public/profile.jpg")} alt="profile" width="100px" height="100px" />
            </div>
            <p className='name'>Hello</p>
            <p className='name'>{name}</p>
            <p className='name'>Github:</p>
            <a href={github}>{github}</a>
            <p className='activity'>{activity}</p>

            </div>
        </div>
    );
}