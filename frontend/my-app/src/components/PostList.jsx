import React, { useState } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import CommentList from './CommentList'
import './PostList.css'

function PostList({ handleComment, handleLike, handleShare, handleEdit }) {
    const AUTHOR_ID = "111";
    const base_url = "http://127.0.0.1:8000";
    const [postData, setPostData] = useState([]);
    axios
        .get(`${base_url}/authors/${AUTHOR_ID}/posts_all`)
        .then((data) => {
            setPostData(data.data.items)

        })
        .catch((e) => console.log(e));

    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author}
                            postId={val.id}
                            description={val.description}
                            like={0}
                            comments={<CommentList postId={val.id} />}
                            handleShare={handleShare}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default PostList;