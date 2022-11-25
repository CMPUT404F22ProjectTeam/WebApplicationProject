import axios from "axios";
import React, { useState, useEffect } from "react";
import MySinglePost from "./../Post/MySinglePost";
import CommentList from './../Comment/CommentList'
import './PostList.css'


const base_url = process.env.REACT_APP_CURRENT_URL;

function MyPostList() {
    const AUTHOR_ID = "1111111111";
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/posts`)
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