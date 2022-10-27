import React from 'react'
import Navbar from './Navbar'
import './HomeNavbar.css'
import Profile from '../../views/profile';

export default function HomeNavbar() {
    return (
        <div className='homeNavbar'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <Profile />
            </div>
        </div>
    );
}