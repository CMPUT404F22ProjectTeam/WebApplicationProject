import React, { useState } from "react";
import { ExPostData } from './ExamplePost'
import FriendSinglePost from "./FriendSinglePost";
import CommentList from './CommentList';
import axios from "axios";
import './PostList.css'

function FriendPostList() {
    const AUTHOR_ID = "111";
    const base_url = "http://127.0.0.1:8000";
    const [postData, setPostData] = useState([]);

    return (<div>
        <ul className="PostList">
            {ExPostData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <FriendSinglePost
                            author={val.author}
                            postId={val.id}
                            description={val.description}
                            comments={<CommentList postId={val.id} />}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendPostList;