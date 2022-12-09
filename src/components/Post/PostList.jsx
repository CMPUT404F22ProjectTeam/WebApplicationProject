import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import FormData from 'form-data'
import CommentList from './../Comment/CommentList'
import './PostList.css'
import { Cookies } from 'react-cookie';

const base_url = process.env.REACT_APP_CURRENT_URL;
const t06_url = process.env.REACT_APP_API_URL;
const t07_url = process.env.REACT_APP_API2_URL;
const t18_url = process.env.REACT_APP_API3_URL;

function PostList() {
    const cookies = new Cookies();
    const AUTHOR_ID = cookies.get('id').split("/").pop();
    const [postData, setPostData] = useState([]);
    const [postData6, setPostData6] = useState([]);
    const [postData7, setPostData7] = useState([]);
    const [postData18, setPostData18] = useState([]);
    const [authors6, setAuthors6] = useState([]);
    const [authors7, setAuthors7] = useState([]);

    useEffect(() => {
        axios.get(`${base_url}/authors/posts_all`, { auth: { username: 'admin', password: 'admin' } })
            .then((res) => {
                setPostData(res.data.items)
            })
            .catch((e) => console.error(e.message));
    }, [postData])

    useEffect(() => {
        axios.get(`${t06_url}/authors/`, { auth: { username: 'charlotte', password: '12345678' } })
            .then((res) => {
                setAuthors6(res.data.items)
                authors6.forEach((author) => {
                    axios.get(`${author.id}/posts/`, { auth: { username: 'charlotte', password: '12345678' } })
                        .then((res) => {
                            res.data.items.forEach((post) => {
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

    useEffect(() => {
        axios.get(`${t07_url}/service/authors/`, { auth: { username: 'charlotte', password: '12345678' } })
            .then((res) => {
                setAuthors7(res.data.items)
                authors7.forEach((author) => {
                    axios.get(`${t07_url}/service/authors/${author.id}/posts/`, { auth: { username: 'charlotte', password: '12345678' } })
                        .then((res) => {
                            Object.values(res.data).forEach((post) => {
                                var index = JSON.stringify(postData7).indexOf(JSON.stringify(post))
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

    useEffect(() => {
        axios.get(`${t18_url}/authors/posts/`, { auth: { username: 't18user1', password: 'Password123!' } })
            .then((res) => {
                setPostData18(res.data.items)
            })
            .catch((e) => console.error(e.message));
    }, [postData18])

    return (<div>
        <ul className="PostList">
            {postData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author.id}
                            displayName={val.author.displayName}
                            postId={val.id}
                            title={val.title}
                            description={val.description}
                            content={val.content}
                            contentType={val.contentType}
                            comments={<CommentList postId={val.id} />}
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
                            title={val.title}
                            description={val.description}
                            content={val.content}
                            contentType={val.contentType}
                            comments={<CommentList postId={val.id} />}
                        />
                    </li>
                );
            })}</ul>
        <ul className="PostList">
            {postData7.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={t07_url + '/service/authors/' + val.author.id}
                            postId={t07_url + '/service/authors/' + val.author.id + '/posts/' + val._id}
                            title={val.title}
                            description={val.description}
                            content={val.content}
                            contentType={val.contentType}
                            comments={<CommentList postId={t07_url + '/service/authors/' + val.author.id + '/posts/' + val._id} />}
                        />
                    </li>
                );
            })}</ul>
        <ul className="PostList">
            {postData18.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            author={val.author.id}
                            displayName={val.author.displayName}
                            postId={val.id}
                            title={val.title}
                            description={val.description}
                            content={val.content}
                            contentType={val.contentType}
                            comments={<CommentList postId={val.id} />}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default PostList;