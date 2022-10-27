import React from 'react'
import './homePage.css'
import MyPost from '../myPost';
import Navbar from '../../components/Navbar/Navbar'
import Profile from '../profile'
export default function HomePage() {
    return (
        <div className='homePage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <Profile />
            </div>
            <div className='split Home'>
                <div className='container'>
                    <MyPost />
                </div>
            </div>
        </div>
    );
}
