import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './FriendList.css'
import axios from "axios";
import { Cookies } from 'react-cookie';

const base_url = process.env.REACT_APP_CURRENT_URL;

function FriendList() {
    const cookies = new Cookies();
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const AUTHOR_ID = cookies.get('id').split("/").pop();
    const auth = { username: 'admin', password: 'admin' };
    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/followers`, { auth: auth })
            .then((res) => {
                setFriends(res.data.items)
            })
            .catch((e) => console.log(e));
    }, [friends])
    const toOtherUser = (id, name) => {
        if (id.split("/").pop() === AUTHOR_ID) {
            alert("This is yourself!")
        }
        else {
            navigate('../otherProfile', { state: { id: id, name: name } });

        }
    }
    return (<div>
        <ul className="FriendList">
            {friends.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleFriend">
                            <a className="userName" onClick={() => { toOtherUser(val.id, val.displayName) }}>@{val.displayName}</a>
                        </div>

                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendList;