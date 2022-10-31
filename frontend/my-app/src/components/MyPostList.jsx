import axios from "axios";
import React, { useState } from "react";
import MySinglePost from "./MySinglePost";
import CommentList from './CommentList'
import './PostList.css'

function MyPostList() {
    const AUTHOR_ID = "1111111111";
    const base_url = "http://127.0.0.1:8000";
    const [postData, setPostData] = useState([]);

    axios
        .get(`${base_url}/authors/${AUTHOR_ID}/posts`)
        .then((data) => {
            setPostData(data.data)
        })
        .catch((e) => console.log(e));

    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <MySinglePost
                            description={val.description}
                            postId={val.id}
                            comments={<CommentList postId={val.id} />}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default MyPostList;