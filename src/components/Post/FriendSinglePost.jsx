import React, { useState, useEffect, useCallback } from "react";
import Form from "./Form";
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';

const FriendSinglePost = ({ postId, comments }) => {
    const [like, setLike] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    let commentData = new FormData();
    let likeData = new FormData();

    useEffect(() => {
        axios
            .get(`${postId}/`)
            .then((data) => {
                setAuthorId(data.data.author)
                setDescription(data.data.description)
            })
            .catch((e) => console.log(e));
        axios
            .get(`${postId}/likes`)
            .then((data) => {
                setLike(Number(data.data.length))
            })
            .catch((e) => console.log(e));
    }, [authorId, description, like])


    const handleLike = useCallback(
        async (e) => {
            e.preventDefault()
            likeData.append('context', "Charlote likes your post.")
            likeData.append('summary', authorId)
            axios
                .post(`${postId}/likes`, likeData)
                .then((response) => {
                    console.log(response);
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        [authorId]
    )

    axios
        .get(`${authorId}`)
        .then((data) => {
            setName(data.data.displayName)
        })
        .catch((e) => console.log(e));

    const toOtherUser = () => {
        navigate('./otherProfile', { state: { id: authorId } });
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