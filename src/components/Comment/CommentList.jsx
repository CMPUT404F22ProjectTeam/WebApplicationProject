import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import axios from "axios";
import './CommentList.css'

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    let foreign18 = false;
    let auth = {};
    let auth5 = { username: 'admin', password: 'admin' };
    let auth67 = { username: 'charlotte', password: '12345678' };
    let auth18 = { username: 't18user1', password: 'Password123!' };
    if (postId.includes('fallprojback') === true) {
        auth = auth5
    } else if (postId.includes('cmput404team18-backend') === true) {
        foreign18 = true
        auth = auth18
    } else {
        auth = auth67
    }

    useEffect(() => {
        axios
            .get(`${postId}/comments`, { auth: auth })
            .then((data) => {
                if (data.data.comments) {
                    setComments(data.data.comments)
                }
            })
            .catch((e) => console.log(e));
    }, [comments])


    return (<div>
        <ul className="CommentList">
            {comments.map((val, key) => {
                if (foreign18 === true) {
                    return (
                        <li key={key}>
                            <SingleComment authorId={val.author.url} displayName={val.author.displayName} comment={val.comment} />
                        </li>
                    )
                } else {
                    return (
                        <li key={key}>
                            <SingleComment authorId={val.author} comment={val.comment} />
                        </li>
                    )
                }

            })}</ul>
    </div>
    )
}

export default CommentList;