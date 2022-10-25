import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './worldPage.css'
import WorldPost from './worldPost';

export default function WorldPage() {
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className=' split world'>
                <div className='container'>
                    <WorldPost />
                </div>
            </div>
        </div>
    );
}
