import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import './worldPage.css'

export default function OtherUserPage({ objectId }) {
    const [objectName, setObjectName] = useState('Charlotte');

    /*
    axios
        .get(`${objectId}`)
        .then((data) => {
            setObjectName(data.data.displayName)
        })
        .catch((e) => console.log(e));
    */
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split world'>
                <div className='container'>
                    <h1 className='userHeader'>{objectName}</h1>
                    <div className="beFriendButton">
                        <button className="followButton">Follow</button>
                        <button className="followButton">Unfollow</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
