import React, { useState, useEffect, useCallback } from "react";
import Form from "./Form";
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const FriendSinglePost = ({ postId, comments }) => {
    const cookies = new Cookies();
    const My_ID = cookies.get('id').split("/").pop();
    const My_Name = cookies.get('username')
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
    let id = String(postId).split("/").pop();
    let me = cookies.get('id')

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
        axios
            .get(`${authorId}`)
            .then((data) => {
                setName(data.data.displayName)
            })
            .catch((e) => console.log(e));
    }, [authorId, description, like])


    const handleLike = useCallback(
        async (e) => {
            e.preventDefault()
            likeData.append('context', { My_Name } + " likes your post.")
            likeData.append('summary', { My_Name } + " likes your post.")
            likeData.append('author', me)
            likeData.append('post', id)
            likeData.append('object', "/authors/" + { My_ID } + "/posts/" + { id })
            if (authorId.includes('cmput404team18-backend') === true) {
                axios
                    .post(`${base_url}/authors/${My_ID}/inbox/like`, likeData, { auth: auth })
                    .then((response) => {
                        console.log(response);
                        //window.location.reload()
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                axios
                    .post(`${postId}/likes`, likeData, { auth: auth })
                    .then((response) => {
                        console.log(response);
                        window.location.reload()
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        [authorId]
    )

    const toOtherUser = () => {
        navigate('/otherProfile', { state: { id: authorId } });
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