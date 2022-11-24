import React, { useState, useEffect } from "react";
import './CommentList.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SingleComment = ({ authorId, comment }) => {
    const me = "http://fallprojback.herokuapp.com/authors/1111111111"
    const [name, setName] = useState('');
    const AUTHOR_ID = authorId;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${AUTHOR_ID}`)
            .then((data) => {
                setName(data.data.displayName)
            })
            .catch((e) => console.log(e));
    }, [name])

    const toOtherUser = () => {
        if (AUTHOR_ID === me) {
            alert("This is yourself!")
        }
        else {
            navigate('./otherProfile', { state: { id: AUTHOR_ID } });
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