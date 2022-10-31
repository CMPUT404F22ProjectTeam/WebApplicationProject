import React from 'react'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import './homePage.css'
import MyPost from '../myPost';

export default function HomePage() {
    return (
        <div className='homePage'>
            <div className='bar'>
                <HomeNavbar />
            </div>
            <div className='split Home'>
                <div className='container'>
                    <MyPost />
                </div>
            </div>
        </div>
    );
}