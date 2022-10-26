import React from "react";
import Form from "./Form";
import './SinglePost.css'
const FriendSinglePost = ({ name, description, image, comments, like, userHref, handleComment, handleLike }) => {
    return (
        <div className="singlePost">
            <a className="userName" href={userHref}>@{name}:</a>
            <p className="singleDes">{description}</p>
            <div className='center'>
                <img className='postImage' src={image} />
            </div>
            <div className="postBar">
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
export default FriendSinglePost