import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './worldPage.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_CURRENT_URL;

export default function OtherUserPage() {
    const me = "1111111111";
    const location = useLocation();
    const [objectName, setObjectName] = useState(location.state.name);
    const [response, setResponse] = useState('');
    const AUTHOR_ID = location.state.id;
    const navigate = useNavigate();
    var authorId = String(AUTHOR_ID).split("/").pop();
    let auth67 = { username: 'charlotte', password: '12345678' };

    useEffect(() => {
        if (AUTHOR_ID.includes('cmput404-social.herokuapp') === true) {
            axios
                .get(`${AUTHOR_ID}`, { auth: auth67 })
                .then((data) => {
                    setObjectName(data.data.displayName)
                })
                .catch((e) => console.log(e));
        }
    }, [objectName, AUTHOR_ID])

    const handleBack = () => {
        navigate(-1)
    }

    const handleFollow = () => {
        axios
            .post(`${base_url}/authors/${me}/follow_request/${authorId}/`, { auth: { username: 'charlotte', password: '12345678' } })
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
