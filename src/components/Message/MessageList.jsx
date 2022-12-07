import { CommentsDisabled } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ExMessageData } from './../Example/ExampleMessage'
import { useNavigate } from 'react-router-dom';
import './MessageList.css'

const base_url = process.env.REACT_APP_CURRENT_URL;

function MessageList() {
    //const [posts, setPosts] = useState([]);
    //const [likes, setLikes] = useState([]);
    //const[comments, setComments] = useState([]);
    //const [requestData, setRequestData] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    const AUTHOR_ID = "6a51cf3bcd9e4996ab061dc658c0c8a9";
    const auth = { username: 'admin', password: 'admin' };
    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/inbox`, { auth: auth })
            .then((res) => {
                let temp = []
                res.data.message.forEach((item) => {
                    if (item.message.type === 'like') {
                        temp.push({ "type": item.message.type, "message": item.message.context })
                    } else if (item.message.type === 'comment') {

                    } else if (item.message.type === 'post') {
                        let name = item.message.author.displayName
                        let content = name + " shares a post to you!"
                        temp.push({ "type": item.type, "message": content })
                    } else {
                        let name = item.message.actor
                        let content = name + " wants to follow you!"
                        temp.push({ "type": item.message.type, "message": content, "id": item.message.actor })
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
            navigate('./otherProfile', { state: { id: author, name: name } });
        }
    }


    const handleAccept = (id) => {
        axios
            .put(`${base_url}/authors/${AUTHOR_ID}/followers/${id.split("/").pop()}`, { auth: auth })
            .then((response) => {
                console.log(response);
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
                                    <a className="userName" onClick={() => { toOtherUser(val.displayName, val.id) }}>@{val.displayName}</a>
                                    <p className="message">{" want to follow you."}</p>
                                </div>
                                <div className="acceptButton">
                                    <button className="accept" onClick={() => { handleAccept(val.id) }}>Accept</button>
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