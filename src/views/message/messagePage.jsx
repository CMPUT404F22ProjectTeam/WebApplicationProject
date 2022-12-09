import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import './../world/worldPage.css'
import MessageList from './../../components/Message/MessageList';

export default function MessagePage() {
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
