import React from "react";
import { ExCommentData } from './ExampleComment'
import './CommentList.css'

function CommentList() {
    return (<div>
        <ul className="CommentList">
            {ExCommentData.map((val, key) => {
                return (
                    <li key={key}>
                        <div className="SingleComment">
                            <p className="userComment">@{val.user}:</p>
                            <p className='comment'>{val.comment}</p>
                        </div>
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default CommentList;