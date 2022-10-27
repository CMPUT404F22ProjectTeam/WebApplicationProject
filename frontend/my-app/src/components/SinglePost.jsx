import React, { useState } from "react";
import Form from "./Form";
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import './SinglePost.css'
const SinglePost = ({ name, description, image, comments, like, userHref, handleShare, handleComment, handleSend }) => {
    const [count, setCount] = useState(like);
    let is_liked = count === (like + 1);
    const handleLike = () => {
        if (is_liked === false) {
            setCount((count) => count + 1);
        }
    }
    return (
        <div className="singlePost">
            <a className="userName" href={userHref}>@{name}:</a>
            <p className="singleDes">{description}</p>
            <div className='center'>
                <img className='postImage' src={image} />
            </div>
            <div className="postBar">
                <button className="eds" onClick={handleShare}>
                    <ShareIcon />
                </button>
                <Form
                    type="text"
                    name="comment"
                    onchange={handleComment}
                    placeholder="leave your comment"
                ></Form>
                <button className="eds" onClick={handleSend}>
                    <SendIcon />
                </button>
                <button className="like" id={is_liked ? "liked" : ""} onClick={handleLike}>
                    Like {count}
                </button>
            </div>
            <ul>{comments}</ul>
        </div>
    )
}
export default SinglePost