import React from "react";
import { ExPostData } from './ExamplePost'
import FriendSinglePost from "./FriendSinglePost";
import './PostList.css'

function FriendPostList({ handleComment, handleLike, handleShare, handleEdit }) {
    return (<div>
        <ul className="PostList">
            {ExPostData.map((val, key) => {
                return (
                    <li key={key} id="onePost">
                        <FriendSinglePost
                            name={val.name}
                            userHref={val.userHref}
                            description={val.description}
                            image={val.image}
                            comments={val.comments}
                            like={val.like}
                            handleComment={handleComment}
                            handleLike={handleLike}
                        />
                    </li>
                );
            })}</ul>
    </div>
    )
}

export default FriendPostList;