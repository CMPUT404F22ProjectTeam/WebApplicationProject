import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './homePage.css'
import PostList from './postList';
export default function HomePage() {
    return (
        <div className='page'>
            <div className='split' id='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <p className='name'>Hello</p>
                <p className='name'>404 User</p>
            </div>
            <div className='split Home'>
                <div className='container'>
                    <PostList />
                </div>
            </div>
        </div>
    );
}
