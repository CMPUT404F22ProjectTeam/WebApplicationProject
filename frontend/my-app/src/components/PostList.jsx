import React, { useState } from "react";
import SinglePost from "./SinglePost";
import './PostList.css'
import { ExPostData } from './ExamplePost'

function PostList({ handleComment, handleShare, handleEdit }) {
    return (<div>
        <ul className="PostList">
            {ExPostData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <SinglePost
                            name={val.name}
                            userHref={val.userHref}
                            description={val.description}
                            image={val.image}
                            comments={val.comments}
                            like={like}
                            handleComment={handleComment}
                            handleLike={handleLike}
                            handleShare={handleShare}
                            handleEdit={handleEdit}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default PostList;