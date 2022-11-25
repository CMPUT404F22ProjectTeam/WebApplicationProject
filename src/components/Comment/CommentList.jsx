import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import axios from "axios";
import './CommentList.css'

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`${postId}/comments`)
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
                return (
                    <li key={key}>
                        <SingleComment authorId={val.author} comment={val.comment} />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default CommentList;