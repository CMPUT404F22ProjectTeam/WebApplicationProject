import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import './FriendPage.css'
import FriendList from './../../components/Friend/FriendList';
import FriendPostList from './../../components/Post/FriendPostList';

export default function FriendPage() {
    return (
        <div className='friendPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split friend'>
                <hr></hr>
                <div className='container'>
                    <h1 className='friendHeader'>True Friends</h1>
                    <FriendList />
                </div>
                
                <div className='split Home'>
                    <div className='container'>
                        <FriendPostList />
                    </div>
                </div>
            </div>
        </div>
    );
}
