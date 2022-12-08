import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './MessageList.css'
import { Cookies } from 'react-cookie';

const base_url = process.env.REACT_APP_CURRENT_URL;

function MessageList() {
    const cookies = new Cookies();
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    const AUTHOR_ID = cookies.get('id').split("/").pop();
    const auth = { username: 'admin', password: 'admin' };
    let name = '';
    let content = '';
    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/inbox`, { auth: auth })
            .then((res) => {
                let temp = []
                res.data.message.forEach((item) => {
                    if (item.message.type === 'like') {
                        temp.push({ "type": item.message.type, "message": item.message.context })
                    } else if (item.message.type === 'comment') {

                    } else if (item.message.type === 'Post') {
                        content = item.message.object + " shares a post to you!"
                        temp.push({ "type": item.message.type, "message": content, "post": item.message.id })
                    } else if (item.message.type === 'Follow') {
                        name = item.message.actor
                        content = " wants to follow you!"
                        temp.push({ "type": item.message.type, "message": content, "id": item.message.actor, "name": item.message.actor_username })
                    }
                })
                setMessage(temp)
            })
            .catch((e) => console.log(e));
    }, [message])

    const toOtherUser = (name, author) => {
        if (author === AUTHOR_ID) {
            alert("This is yourself!")
        }
        else {
            navigate('../otherProfile', { state: { id: author, name: name } });
        }
    }

    const toPost = (id) => {
        navigate('../sharePost', { state: { id: id } });
    }


    const handleAccept = (id, name) => {
        axios
            .put(`${base_url}/authors/${AUTHOR_ID}/followers/${id.split("/").pop()}`)
            .then((response) => {
                console.log(response);
                alert(name + " follows you now!")
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (<div>
        <ul className="MessageList">
            {message.map((val, key) => {
                if (val.type === "Follow") {
                    return (
                        <li key={key}>
                            <div className="SingleMessage">
                                <div className="messagePart">
                                    <a className="userName" onClick={() => { toOtherUser(val.name, val.id) }}>@{val.name}</a>
                                    <p className="message">{val.message}</p>
                                </div>
                                <div className="acceptButton">
                                    <button className="accept" onClick={() => { handleAccept(val.id, val.name) }}>Accept</button>
                                </div>
                            </div>
                        </li>
                    );
                }
                else if (val.type === "Post") {
                    return (
                        <li key={key}>
                            <div className="SingleMessage">
                                <div className="messagePart">
                                    <a className="userName" onClick={() => { toPost(val.post) }}>@{val.message}</a>
                                </div>
                            </div>
                        </li>
                    );
                }
                else {
                    return (
                        <li key={key}>
                            <div className="SingleMessage">
                                <div className="messagePart">
                                    <p className="message">{val.message}</p>
                                </div>
                            </div>
                        </li>
                    );
                }

            })}</ul>
    </div>
    )
}

export default MessageList;