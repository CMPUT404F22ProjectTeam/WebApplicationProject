import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import FormData from 'form-data'
import './SinglePost.css'

const MySinglePost = ({ description, image, comments, like, postId }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(like);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    let is_liked = count === (like + 1);
    let data = new FormData();
    const handleLike = () => {
        if (is_liked === false) {
            setCount((count) => count + 1);
        }
    }
    const handleEdit = () => {
        navigate("/Post");
    }

    const handleDel = () => {
        axios
            .delete(`${postId}`)
            .then((response) => {
                console.log(response);
                window.location.reload()
            })
            .catch((e) => {
                console.log(e);
            });
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
            <p className="singleDes">{description}</p>
            <div className='center'>
                <img className='postImage' src={image} />
            </div>
            <div className="postBar">
                <button className="eds" onClick={handleDel}>
                    <DeleteIcon />
                </button>
                <button className="eds" onClick={handleEdit}>
                    <EditIcon />
                </button>
                <Form
                    type="text"
                    name="comment"
                    action={handleComment}
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
            <ul>{comments}</ul>
        </div>
    )
}
export default MySinglePost