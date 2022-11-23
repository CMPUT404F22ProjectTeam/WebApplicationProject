import React, { useState } from "react";
import FriendSinglePost from "./FriendSinglePost";
import CommentList from './../Comment/CommentList';
import axios from "axios";
import './PostList.css'

function FriendPostList() {
    const AUTHOR_ID = "1111111111";
    const base_url = "http://127.0.0.1:8000";
    const [postData, setPostData] = useState([]);
    axios
        .get(`${base_url}/authors/${AUTHOR_ID}/posts_friend_only/`)
        .then((data) => {
            setPostData(data.data)
        })
        .catch((e) => console.log(e));

    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <FriendSinglePost
                            postId={val}
                            comments={<CommentList postId={val} />}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendPostList;