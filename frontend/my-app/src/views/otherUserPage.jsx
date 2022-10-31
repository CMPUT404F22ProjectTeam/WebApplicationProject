import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import './worldPage.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function OtherUserPage() {
    const me = "111";
    const base_url = "http://127.0.0.1:8000";
    const [objectName, setObjectName] = useState('');
    const [response, setResponse] = useState('');
    const location = useLocation();
    const AUTHOR_ID = location.state.id;
    const navigate = useNavigate();
    var authorId = String(AUTHOR_ID).split("/").pop();

    axios
        .get(`${AUTHOR_ID}`)
        .then((data) => {
            setObjectName(data.data.displayName)
        })
        .catch((e) => console.log(e));

    const handleBack = () => {
        navigate(-1)
    }

    const handleFollow = () => {
        axios
            .post(`${base_url}/authors/${me}/follow_request/${authorId}/`)
            .then((response) => {
                setResponse(response.data)
                console.log(response)
            })
            .catch((e) => console.log(e));
    }
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split world'>
                <div className='container'>
                    <button className="BackButton" onClick={handleBack}>{"<"}</button>
                    <h1 className='userHeader'>{objectName}</h1>
                    <div className="beFriendButton">
                        <button className="followButton" onClick={handleFollow}>Follow</button>
                        <button className="followButton">Unfollow</button>
                    </div>
                    <p className='flash'>{response}</p>
                </div>
            </div>
        </div>
    );
}
