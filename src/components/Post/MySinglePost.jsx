import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import FormData from 'form-data'
import './SinglePost.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MySinglePost = ({ title, description, content, comments, postId }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    let commentData = new FormData();
    let likeData = new FormData();
    let type = {};

    useEffect(() => {
        axios
            .get(`${postId}/likes`, { auth: { username: 'admin', password: 'admin' } })
            .then((data) => {
                setLike(Number(data.data.length))
            })
            .catch((e) => console.log(e));
    }, [like])

    const handleLike = () => {
        likeData.append('context', "Charlote likes your post.")
        likeData.append('summary', "123456")
        axios
            .post(`${postId}/likes`, likeData, { auth: { username: 'admin', password: 'admin' } })
            .then((response) => {
                console.log(response);
                window.location.reload()
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const handleEdit = () => {
        navigate("/post", { state: { id: postId } });
    }

    const handleDel = useCallback(
        async (e) => {
            e.preventDefault()
            axios
                .delete(`${postId}/`, { auth: { username: 'admin', password: 'admin' } })
                .then((response) => {
                    console.log(response);
                    alert("Delete Successfully!")
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        [postId]
    )

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
                .post(`${postId}/comments`, commentData, { auth: { username: 'admin', password: 'admin' } })
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [comment, postId]
    )
    return (
        <div className="singlePost">
            <p className="singleTit">{title}</p>
            <p className="des">{description}</p>
            <div className='center'>
                {content.includes("image")&&(<img className='postContent' src={`data:image;base64,${content.split(",")[1]}`} />)||<p className='single-content'>{content}</p>}                
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
                    className = "comment-form"
                    action={handleComment}
                    placeholder="Leave your comment"
                ></Form>
                <button className="eds" onClick={handleSend}>
                    <SendIcon />
                </button>
                <button className="like" onClick={handleLike}>
                    <FavoriteBorderIcon /> {like}
                </button>
            </div>
            <p className="flash">{commentError}</p>
            <ul>{comments}</ul>
        </div>
    )
}
export default MySinglePost