import React, { useState, useCallback } from "react";
import Form from "./Form";
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';

const FriendSinglePost = ({ author, postId, description, image, comments }) => {
    const [like, setLike] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const navigate = useNavigate();
    const AUTHOR_ID = author;
    let commentData = new FormData();
    let likeData = new FormData();

    axios
        .get(`${postId}/likes`)
        .then((data) => {
            setLike(Number(data.data.length))
        })
        .catch((e) => console.log(e));

    const handleLike = () => {
        likeData.append('context', "Charlote likes your post.")
        likeData.append('summary', "123456")
        axios
            .post(`${postId}/likes`, likeData)
            .then((response) => {
                console.log(response);
                window.location.reload()
            })
            .catch((e) => {
                console.log(e);
            });
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
            commentData.append('content', comment)
            axios
                .post(`${postId}/comments`, commentData)
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
                <button className="like" onClick={handleLike}>
                    Like {like}
                </button>
            </div>
            <p className="flash">{commentError}</p>
            <div> {comments}</div>
        </div>
    )
}
export default FriendSinglePost