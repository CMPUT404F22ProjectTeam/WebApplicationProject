import React, { useState, useEffect } from "react";
import FriendSinglePost from "./FriendSinglePost";
import CommentList from './../Comment/CommentList';
import axios from "axios";
import './PostList.css'

const base_url = process.env.REACT_APP_CURRENT_URL;

function FriendPostList() {
    const AUTHOR_ID = "1111111111";
    const [postData, setPostData] = useState([]);
    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/posts_friend_only/`)
            .then((data) => {
                setPostData(data.data)
            })
            .catch((e) => console.log(e));
    }, [postData])

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