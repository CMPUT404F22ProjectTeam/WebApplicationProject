import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import CommentList from './../Comment/CommentList'
import './PostList.css'


const base_url = process.env.REACT_APP_API_URL;

function PostList({ handleShare }) {
    const AUTHOR_ID = "37056da9167cd8561877d431be4ecbf12444cce35556c63e217ac27dcbf827ed";
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        axios
            // .get(`${process.env.REACT_APP_CURRENT_URL}/authors/${AUTHOR_ID}/posts_all`)
            .get(`${base_url}/authors/${AUTHOR_ID}/posts/`, {auth: { username: 'Leila123', password: '12345678' }})
            .then((data) => {
                setPostData(data.data.items)
            })
            .catch((e) => console.log(e));
    }, [postData])


    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author}
                            postId={val.id}
                            description={val.description}
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