import React from "react";
import { ExMessageData } from './ExampleMessage'
import './MessageList.css'

function MessageList() {
    return (<div>
        <ul className="MessageList">
            {ExMessageData.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleMessage">
                            <p className="message">@{val.message}</p>
                        </div>
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default MessageList;