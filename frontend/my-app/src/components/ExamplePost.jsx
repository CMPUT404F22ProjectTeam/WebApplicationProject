import React from "react";
import CommentList from './CommentList'
export const ExPostData = [
    {
        name: "Amily",
        userHref: "/Amily",
        description: "This is my post 1",
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 10,
    },
    {
        name: "Berry",
        userHref: "/Berry",
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 15,
    },
    {
        name: "Candy",
        userHref: "/Candy",
        description: "This is my post 3",
        comments: <CommentList />,
        like: 0,
    },
]
