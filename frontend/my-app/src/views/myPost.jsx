import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Post from './Post'
import MyPostList from '../components/MyPostList';

import "./myPost.css";

export default class MyPost extends React.Component {
    state = {
        seen: false
    };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };


    render() {
        return (
            <div>
                <div onClick={this.togglePop}>
                    <button className="btn">NEW POST</button>
                </div>
                {this.state.seen ? <Post toggle={this.togglePop} /> : null}
                <div>
                    <MyPostList />
                </div>
            </div>
        );
    }
}

