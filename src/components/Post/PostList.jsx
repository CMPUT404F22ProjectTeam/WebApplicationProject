import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import CommentList from './../Comment/CommentList'
import './PostList.css'

function PostList({ handleShare }) {
    const AUTHOR_ID = "1111111111";
    const base_url = "https://fallprojback.herokuapp.com";
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/posts_all`)
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