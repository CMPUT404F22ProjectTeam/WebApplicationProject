import React from "react";
import { ExFriendData } from './../Example/ExampleFriend'
import './FriendList.css'
<style>

</style>
function FriendList() {
    return (
        
    <div>
        <ul className="FriendList">
            {ExFriendData.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleFriend">
                            <a className="userName">@{val.name}</a>
                            <h/>
                        </div>
                        
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendList;