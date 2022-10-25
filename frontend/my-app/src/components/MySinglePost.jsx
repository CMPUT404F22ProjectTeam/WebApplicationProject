import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import Form from "./Form";
import './SinglePost.css'
const MySinglePost = ({ description, image, comments, like, handleDel, handleEdit, handleComment, handleLike }) => {
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
                <button className="like" onClick={handleLike}>
                    Like {like}
                </button>
            </div>
            <ul>{comments}</ul>
        </div>
    )
}
export default MySinglePost