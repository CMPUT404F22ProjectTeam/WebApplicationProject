import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import FormData from 'form-data'
import './SinglePost.css'

const MySinglePost = ({ description, image, comments, postId }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    let commentData = new FormData();
    let likeData = new FormData();

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
        navigate("/Post", { state: { id: postId } });
    }

    const handleDel = useCallback(
        async (e) => {
            e.preventDefault()
            axios
                .delete(`${postId}/`)
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