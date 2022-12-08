import React, { useState, useEffect } from "react";
import './CommentList.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const SingleComment = ({ authorId = '', displayName, comment }) => {
    const cookies = new Cookies();
    const My_ID = cookies.get('id').split("/").pop();
    const me = cookies.get('id')
    const [name, setName] = useState(displayName);
    const navigate = useNavigate();
    let auth = {};
    let auth5 = { username: 'admin', password: 'admin' };
    let auth67 = { username: 'charlotte', password: '12345678' };
    let auth18 = { username: 't18user1', password: 'Password123!' };
    if (authorId.includes('fallprojback') === true) {
        auth = auth5
    } else if (authorId.includes('cmput404team18-backend') === true) {
        auth = auth18
    } else {
        auth = auth67
    }

    useEffect(() => {
        axios
            .get(`${authorId}`, { auth: auth })
            .then((data) => {
                setName(data.data.displayName)
            })
            .catch((e) => console.log(e));
    }, [name])

    const toOtherUser = () => {
        if (authorId === me) {
            alert("This is yourself!")
        }
        else {
            navigate('/otherProfile', { state: { id: authorId } });

        }
    }
    return (
        <div className="SingleComment">
            <a className="userComment" onClick={() => { toOtherUser() }}>@{name}:</a>
            <p className='comment'>{comment}</p>
        </div>
    )
}
export default SingleComment