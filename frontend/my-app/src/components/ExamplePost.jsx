import React from "react";
import CommentList from './CommentList'
export const ExPostData = [
    {
        description: "This is my post 1",
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 10,
    },
    {
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 15,
    },
    {
        description: "This is my post 3",
        comments: <CommentList />,
        like: 0,
    },
]
