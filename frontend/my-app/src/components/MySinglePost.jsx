import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import Form from "./Form";
import './SinglePost.css'
const MySinglePost = ({ description, image, comments, like, handleDel, handleEdit, handleComment, handleSend }) => {
    const [count, setCount] = useState(like);
    let is_liked = count === (like + 1);
    const handleLike = () => {
        if (is_liked === false) {
            setCount((count) => count + 1);
        }
    }
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
export default MySinglePost