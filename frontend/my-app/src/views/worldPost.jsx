import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SinglePost from '../components/SinglePost';

import "./myPost.css";

export default function WorldPost() {

    return (
        <div>
            <div>
                <SinglePost
                    name="Charlotte"
                    description={'This is a post.'}
                    image={require('../public/example.jpg')}
                    comments="This is a comment."
                    like="10"
                ></SinglePost>
            </div>
        </div>
    );
}

