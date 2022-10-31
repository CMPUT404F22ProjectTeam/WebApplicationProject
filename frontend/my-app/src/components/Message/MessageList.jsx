import axios from "axios";
import React, { useState } from "react";
import { ExMessageData } from './../Example/ExampleMessage'
import './MessageList.css'

function MessageList() {
    const [requestData, setRequestData] = useState([])
    const AUTHOR_ID = "1111111111";
    const base_url = "http://127.0.0.1:8000";
    axios
        .get(`${base_url}/authors/${AUTHOR_ID}/follow_request`)
        .then((data) => {
            setRequestData(data.data)
        })
        .catch((e) => console.log(e));

    /*
    const handleAccept = (id) => {
        axios
            .put(`${base_url}/authors/${AUTHOR_ID}/followers/${id.split("/").pop()}`)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    */
    return (<div>
        <ul className="MessageList">
            {requestData.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleMessage">
                            <div className="messagePart">
                                <a className="userName">@{val.displayName}</a>
                                <p className="message">{" want to follow you."}</p>
                            </div>
                            <div className="acceptButton">
                                <button className="accept">Accept</button>
                            </div>
                        </div>
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default MessageList;