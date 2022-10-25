import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './worldPage.css'
import MessageList from '../components/MessageList';

export default function WorldPage() {
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split world'>
                <div className='container'>
                    <h1 className='messageHeader'>Here are your new messages!</h1>
                    <MessageList />
                </div>
            </div>
        </div>
    );
}
