import React from "react";
import Form from "./Form";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import './SinglePost.css'
const SinglePost = ({ name, description, image, comments, like, userHref, handleShare, handleEdit, handleComment, handleLike }) => {
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
export default SinglePost