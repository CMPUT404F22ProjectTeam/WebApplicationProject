import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import './worldPage.css'
import PostList from './../../components/Post/PostList';

export default function WorldPage() {
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className=' split world'>
            <hr></hr>
                <div className='worldlist'>
                    <PostList />
                </div>
            </div>
        </div>
    );
}
