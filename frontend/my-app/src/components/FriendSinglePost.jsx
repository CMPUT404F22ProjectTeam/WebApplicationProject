import React, { useState, useCallback } from "react";
import Form from "./Form";
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';

const FriendSinglePost = ({ author, postId, description, image, comments, like }) => {
    const [count, setCount] = useState(like);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const navigate = useNavigate();
    const AUTHOR_ID = author;
    let is_liked = count === (like + 1);
    let data = new FormData();

    const handleLike = () => {
        if (is_liked === false) {
            setCount((count) => count + 1);
        }
    }

    axios
        .get(`${AUTHOR_ID}`)
        .then((data) => {
            setName(data.data.displayName)
        })
        .catch((e) => console.log(e));

    const toOtherUser = () => {
        navigate('./otherProfile', { state: { id: AUTHOR_ID } });
    }

    const handleComment = useCallback((event) => {
        setComment(event.target.value)
        setCommentError('')
    }, [])

    const handleSend = useCallback(async (e) => {
        e.preventDefault()
        if (!comment) {
            setCommentError("*Cannot send an empty comment!")
        }
        else {
            data.append('content', comment)
            axios
                .post(`${postId}/comments`, data)
                .then((response) => {
                    console.log(response);
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    })

    return (
        <div className="singlePost">
            <a className="userName" onClick={() => { toOtherUser() }}>@{name}:</a>
            <p className="singleDes">{description}</p>
            <div className='center'>
                <img className='postImage' src={image} />
            </div>
            <div className="postBar">
                <Form
                    type="text"
                    name="comment"
                    onchange={handleComment}
                    placeholder="leave your comment"
                ></Form>
                <button className="eds" onClick={handleSend}>
                    <SendIcon />
                </button>
                <button className="like" id={is_liked ? "liked" : ""} onClick={handleLike}>
                    Like {count}
                </button>
            </div>
            <p className="flash">{commentError}</p>
            <div> {comments}</div>
        </div>
    )
}
export default FriendSinglePost