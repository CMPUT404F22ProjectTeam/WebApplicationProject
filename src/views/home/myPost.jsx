import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Post from './Post'
import MyPostList from './../../components/Post/MyPostList';
import { Link } from "react-router-dom";
import "./myPost.css";

export default class MyPost extends React.Component {
    // state = {
    //     seen: false
    // };

    // togglePop = () => {
    //     this.setState({
    //         seen: !this.state.seen
    //     });
    // };


    
    render() {
        return (
            <div>
                <div>
                    {/* <button className="btn">NEW POST</button> */}
                    <Link to={`/post`} className="btn">NEW POST</Link>
                </div>
                {/* {this.state.seen ? <Post toggle={this.togglePop} /> : null} */}
                <div>
                    <MyPostList />
                </div>
            </div>
        );
    }
}

