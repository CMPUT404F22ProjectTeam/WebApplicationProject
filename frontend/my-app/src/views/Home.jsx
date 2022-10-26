import React from 'react';
import Navbar from './../components/Navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Post from './Post'

export default class Home extends React.Component{
    state = {
        seen: false
        };

    togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
       };

    render(){
        return (
            <div className="Home">
                <Navbar />
                <div className="btn" onClick={this.togglePop}>
                <button>Add Post</button>
                </div>
                {this.state.seen ? <Post toggle={this.togglePop} /> : null}
            </div>
          
        );
    }
}
  