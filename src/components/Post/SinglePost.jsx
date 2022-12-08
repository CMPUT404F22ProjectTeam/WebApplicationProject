import React, { useState, useEffect, useCallback } from "react";
import Form from "./Form";
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
import axios from "axios";
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SinglePost = ({ author, displayName, postId, comments, title, description, content, image, handleShare }) => {
    const me = "http://fallprojback.herokuapp.com/authors/1111111111";
    const [like, setLike] = useState(0);
    const [name, setName] = useState(displayName);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const navigate = useNavigate();
    //let is_liked = count === (like + 1);
    let id = String(postId).split("/").pop();
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
            likeData.append('context', "Charlote likes your post.")
            likeData.append('summary', author)
            axios
                .post(`${postId}/likes`, likeData, { auth: auth })
                .then((response) => {
                    console.log(response);
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });

        },
        [postId, author]
    )

    const toOtherUser = () => {
        if (author === me) {
            alert("This is yourself!")
        }
        else {
            navigate('./otherProfile', { state: { id: author, name: name } });

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
                .post(`${me}/posts/${id}/comments`, commentData, { auth: auth })
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [comment]
    )

    return (
        <div className="singlePost">
            <a className="userName" onClick={() => { toOtherUser() }}>@{name}:</a>
            <p className="singleTit">{title}</p>
            <p className="des">{description}</p>
            <div className='center'>
            {content.includes("image")&&(<img className='postContent' src={`data:image;base64,${content.split(",")[1]}`} />)||<p className='single-content'>{content}</p>}                
            </div>
            <div className="postBar">
                <button className="eds" onClick={handleShare}>
                    <ShareIcon />
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
            <div> {comments}</div>
        </div>
    )
}
export default SinglePost