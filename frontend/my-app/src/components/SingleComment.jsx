import React, { useState } from "react";
import './CommentList.css'
import axios from "axios";
const SingleComment = ({ authorId, comment }) => {
    const [name, setName] = useState('');
    const AUTHOR_ID = authorId;

    axios
        .get(`${AUTHOR_ID}`)
        .then((data) => {
            setName(data.data.displayName)
        })
        .catch((e) => console.log(e));

    return (
        <div className="SingleComment">
            <a className="userComment">@{name}:</a>
            <p className='comment'>{comment}</p>
        </div>
    )
}
export default SingleComment