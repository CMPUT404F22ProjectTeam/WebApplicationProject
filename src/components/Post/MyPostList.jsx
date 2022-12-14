import axios from "axios";
import React, { useState, useEffect } from "react";
import MySinglePost from "./../Post/MySinglePost";
import CommentList from './../Comment/CommentList'
import './PostList.css'
import { Cookies } from 'react-cookie';


const base_url = process.env.REACT_APP_CURRENT_URL;

function MyPostList() {
    const cookies = new Cookies();
    const AUTHOR_ID = cookies.get('id').split("/").pop();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/posts`, { auth: { username: 'admin', password: 'admin' } })
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
                            title = {val.title}
                            description={val.description}
                            content = {val.content}
                            postId={val.id}
                            contentType = {val.contentType}
                            comments={<CommentList postId={val.id} />}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default MyPostList;