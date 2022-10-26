import React from "react";
import { ExPostData } from './ExamplePost'
import MySinglePost from "./MySinglePost";
import './PostList.css'

function MyPostList({ handleDel, handleEdit, handleComment, handleLike }) {
    return (<div>
        <ul className="PostList">
            {ExPostData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <MySinglePost
                            description={val.description}
                            image={val.image}
                            comments={val.comments}
                            like={val.like}
                            handleDel={handleDel}
                            handleEdit={handleEdit}
                            handleComment={handleComment}
                            handleLike={handleLike}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default MyPostList;