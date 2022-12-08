import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './worldPage.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SinglePost from '../../components/Post/SinglePost';
import CommentList from '../../components/Comment/CommentList';
import FriendSinglePost from '../../components/Post/FriendSinglePost';

export default function SharePost() {
    const location = useLocation();
    const [post, setPost] = useState({ author: "", id: "", description: "" });
    const POST_ID = location.state.id;
    const type = location.state.type;
    const navigate = useNavigate();
    const auth = { username: 'admin', password: 'admin' };

    useEffect(() => {
        axios
            .get(`${POST_ID}`, { auth: auth })
            .then((res) => {
                setPost(res.data)
            })
            .catch((e) => console.log(e));
    }, [post])
    console.log(post)
    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split world'>
                <div className='container'>
                    <button className="BackButton" onClick={handleBack}>{"<"}</button>
                    <h1 className='userHeader'>Shared Post</h1>
                    {type === "Post"} ? (
                    <div className="beFriendButton">
                        <SinglePost
                            author={post.author}
                            postId={post.id}
                            description={post.description}
                            comments={<CommentList postId={post.id} />}
                        />
                    </div>
                    ) : (
                    <div className="beFriendButton">
                        <FriendSinglePost
                            postId={post.id}
                            comments={<CommentList postId={post.id} />}
                        />
                    </div>
                    )

                </div>
            </div>
        </div>
    );
}
