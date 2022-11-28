import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import FormData from 'form-data'
import CommentList from './../Comment/CommentList'
import './PostList.css'
import { get } from '../Api'
import { sizeHeight } from "@mui/system";


const base_url = process.env.REACT_APP_CURRENT_URL;
const t06_url = process.env.REACT_APP_API_URL;
const t07_url = process.env.REACT_APP_API2_URL;


function PostList({ handleShare }) {
    const AUTHOR_ID = "1111111111";
    const [postData, setPostData] = useState([]);
    const [postData6, setPostData6] = useState([]);
    const [postData7, setPostData7] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [authors6, setAuthors6] = useState([]);
    const [authors7, setAuthors7] = useState([]);

    useEffect(() => {
        axios.get(`${base_url}/authors/${AUTHOR_ID}/posts_all/`)
            .then((res) => {
                setPostData(res.data.items)
            })
            .catch((e) => console.error(e.message));
    }, [postData])

    useEffect(() => {
        get(`${t06_url}/authors/`)
            .then((res) => {
                setAuthors6(res.items)
                authors6.forEach((author) => {
                    get(`${author.id}/posts/`)
                        .then((res) => {
                            res.items.forEach((post) => {
                                var index = JSON.stringify(postData6).indexOf(JSON.stringify(post))
                                if (post.visibility === "PUBLIC" && index === -1) {
                                    setPostData6(postData6 => [...postData6, post])
                                }
                            })
                        })
                        .catch((e) => console.error(e.message));
                })
            })
            .catch((e) => console.error(e.message));
    }, [authors6, postData6])
    /*
    useEffect(() => {
        get(`${t07_url}/service/authors/`)
            .then((res) => {
                setAuthors7(res.items)
                authors7.forEach((author) => {
                    get(`${t07_url}/service/${author.id}/posts/`)
                        .then((res) => {
                            res.items.forEach((post) => {
                                var index = JSON.stringify(postData7).indexOf(JSON.stringify(post))
                                console.log(index)
                                if (post.visibility === "PUBLIC" && index === -1) {
                                    setPostData7(postData7 => [...postData7, post])
                                }
                            })
                        })
                        .catch((e) => console.error(e.message));
                })
            })
            .catch((e) => console.error(e.message));
    }, [authors7, postData7])
    */
    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author.id}
                            postId={val.id}
                            description={val.description}
                            comments={<CommentList postId={val.id} />}
                            handleShare={handleShare}
                        />
                    </li>
                );
            })}</ul>
        <ul className="PostList">
            {postData6.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author.id}
                            postId={val.id}
                            description={val.description}
                            comments={<CommentList postId={val.id} />}
                            handleShare={handleShare}
                        />
                    </li>
                );
            })}</ul>
        <ul className="PostList">
            {postData7.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={t07_url + '/service/' + val.author.id}
                            postId={t07_url + '/service/' + val.author.id + '/' + val._id}
                            description={val.description}
                            comments={<CommentList postId={t07_url + '/service/' + val.author.id + '/' + val._id} />}
                            handleShare={handleShare}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default PostList;