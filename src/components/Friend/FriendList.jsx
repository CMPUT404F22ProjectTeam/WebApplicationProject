import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './FriendList.css'
import axios from "axios";

const base_url = process.env.REACT_APP_CURRENT_URL;

function FriendList() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const AUTHOR_ID = "6a51cf3bcd9e4996ab061dc658c0c8a9";
    const auth = { username: 'admin', password: 'admin' };
    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/followers`, { auth: auth })
            .then((res) => {
                setFriends(res.data.items)
            })
            .catch((e) => console.log(e));
    }, [friends])
    return (<div>
        <ul className="FriendList">
            {friends.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleFriend">
                            <a className="userName">@{val.displayName}</a>
                        </div>
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendList;