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
                            <a className="userComment">@{val.user}:</a>
                            <p className='comment'>{val.comment}</p>
                        </div>
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default CommentList;