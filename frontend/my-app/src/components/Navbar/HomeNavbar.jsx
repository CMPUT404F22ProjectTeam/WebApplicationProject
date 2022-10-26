import React from 'react'
import Navbar from './Navbar'
import './HomeNavbar.css'

export default function HomeNavbar() {
    return (
        <div className='homeNavbar'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <button className='editProfile'>Edit</button>
                <img class='profileimg' src={require("../../public/profile.jpg")} alt="profile" width="100px" height="100px" />
                <p className='name'>Hello</p>
                <p className='name'>404 User</p>
            </div>
        </div>
    );
}
