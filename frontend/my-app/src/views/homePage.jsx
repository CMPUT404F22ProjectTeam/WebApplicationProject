import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './homePage.css'
import MyPost from './myPost';
export default function HomePage() {
    return (
        <div className='homePage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split'>
                <div className='split profile'>
                    <button className='editProfile'>Edit</button>
                    <img class='profileimg' src={require("../public/profile.jpg")} alt="profile" width="100px" height="100px" />
                    <p className='name'>Hello</p>
                    <p className='name'>404 User</p>
                </div>
                <div className='split Home'>
                    <div className='container'>
                        <MyPost />
                    </div>
                </div>
            </div>
        </div>
    );
}
