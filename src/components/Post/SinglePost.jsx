import React, { useState, useEffect, useCallback } from "react";
import Form from "./Form";
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Cookies } from 'react-cookie';

const base_url = process.env.REACT_APP_CURRENT_URL;

const SinglePost = ({ author, displayName, postId, comments, title, description, content, image }) => {
    const cookies = new Cookies();
    const My_ID = cookies.get('id').split("/").pop();
    const My_Name = cookies.get('username')
    const [like, setLike] = useState(0);
    const [name, setName] = useState(displayName);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const navigate = useNavigate();
    let me = '';
    let id = String(postId).split("/").pop();
    let authorId = String(author).split("/").pop();
    let foreign = "5";
    let commentData = new FormData();
    let likeData = new FormData();
    let postData = new FormData();
    let auth = {};
    let auth5 = { username: 'admin', password: 'admin' };
    let auth67 = { username: 'charlotte', password: '12345678' };
    let auth18 = { username: 't18user1', password: 'Password123!' };
    if (author.includes('fallprojback') === true) {
        auth = auth5
        me = cookies.get('id')
    } else if (author.includes('cmput404team18-backend') === true) {
        auth = auth18
        me = "https://cmput404team18-backend.herokuapp.com/backendapi/authors/91cd9299-6c70-4ec9-8dbc-2afb985fd4f0"
        foreign = "aaa"
    } else if (author.includes('socialdistribution-cmput404') === true) {
        auth = auth67
        foreign = "bbb"

    } else {
        auth = auth67
        foreign = "ccc"
    }

    useEffect(() => {
        axios
            .get(`${postId}/likes`, { auth: auth })
            .then((data) => {
                setLike(Number(data.data.length))
            })
            .catch((e) => console.log(e));
        axios
            .get(`${author}`, { auth: auth })
            .then((data) => {
                setName(data.data.displayName)
            })
            .catch((e) => console.log(e));
    }, [like, name])

    const handleLike = useCallback(
        async (e) => {
            likeData.append('context', { My_Name } + " likes your post.")
            likeData.append('summary', { My_Name } + " likes your post.")
            likeData.append('author', me)
            likeData.append('post', id)
            likeData.append('object', "/authors/" + { My_ID } + "/posts/" + { id })
            if (author.includes('cmput404team18-backend') === true) {
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
        [postId, author]
    )

    const toOtherUser = () => {
        if (author === me) {
            alert("This is yourself!")
        }
        else {
            navigate('../otherProfile', { state: { id: author, name: name } });

        }
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
                .post(`${base_url}/authors/${My_ID}/posts/${id}/comments`, commentData, { auth: auth })
                .then((response) => {
                    console.log(response);
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [comment]
    )

    const handleShare = useCallback(
        async (e) => {
            postData.append('type', "Post")
            postData.append('id', postId)
            postData.append('object', My_Name)
            axios
                .get(`${base_url}/authors/${My_ID}/turefriend`)
                .then((res) => {
                    res.data.forEach((friend) => {
                        axios
                            .post(`${friend.Truefriend}/inbox`, postData, { auth: auth })
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    })
                    alert("Shared successfully!")
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        [postId, author]
    )

    return (
        <div className="singlePost" id={foreign}>
            <a className="userName" onClick={() => { toOtherUser() }}>@{name}:</a>
            <p className="singleTit">{title}</p>
            <p className="des">{description}</p>
            <div className='center'>
                {content.includes("image") && (<img className='postContent' src={`data:image;base64,${content.split(",")[1]}`} />) || <p className='single-content'>{content}</p>}
            </div>
            <div className="postBar">
                <button className="eds" onClick={handleShare}>
                    <ShareIcon />
                </button>
                <Form
                    type="text"
                    name="comment"
                    className="comment-form"
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
            <div> {comments}</div>
        </div>
    )
}
export default SinglePost