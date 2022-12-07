import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import FormData from 'form-data'
import './SinglePost.css'

const MySinglePost = ({ author, postId, comments, description, image }) => {
    const me = "http://fallprojback.herokuapp.com/authors/1111111111"
    const navigate = useNavigate();
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    let commentData = new FormData();
    let likeData = new FormData();
    let auth = {};
    let auth5 = { username: 'admin', password: 'admin' };
    let auth67 = { username: 'charlotte', password: '12345678' };
    let auth18 = { username: 't18user1', password: 'Password123!' };
    if (author.includes('fallprojback') === true) {
        auth = auth5
    } else if (author.includes('cmput404team18-backend') === true) {
        auth = auth18
    } else {
        auth = auth67
    }

    useEffect(() => {
        axios
            .get(`${postId}/likes`)
            .then((data) => {
                setLike(Number(data.data.length))
            })
            .catch((e) => console.log(e));
    }, [like])

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
    const handleEdit = () => {
        navigate("/post", { state: { id: postId } });
    }

    const handleDel = useCallback(
        async (e) => {
            e.preventDefault()
            axios
                .delete(`${me}/posts/${postId}`, { auth: auth })
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
                .post(`${postId}/comments`, commentData)
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
                <button className="like" onClick={handleLike}>
                    Like {like}
                </button>
            </div>
            <p className="flash">{commentError}</p>
            <ul>{comments}</ul>
        </div>
    )
}
export default MySinglePost