import React from "react";
import CommentList from './CommentList'
export const ExPostData = [
    {
        postId: "111",
        userId: "aaa",
        name: "Amily",
        userHref: "/Amily",
        description: "This is my post 1",
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 10,
    },
    {
        postId: "222",
        userId: "bbb",
        name: "Berry",
        userHref: "/Berry",
        image: require('../public/example.jpg'),
        comments: <CommentList />,
        like: 15,
    },
    {
        postId: "333",
        userId: "ccc",
        name: "Candy",
        userHref: "/Candy",
        description: "This is my post 3",
        comments: <CommentList />,
        like: 0,
    },
]
