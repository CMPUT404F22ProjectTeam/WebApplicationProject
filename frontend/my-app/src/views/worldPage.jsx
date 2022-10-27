import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './worldPage.css'
import SinglePost from "../components/SinglePost";
import { ExPostData } from '../components/ExamplePost'
import '../components/PostList.css'

export default function WorldPage() {
    return (
        <div className='worldPage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className=' split world'>
                <div className='container'>
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
                                        like={val.like}
                                    //handleComment={handleComment}
                                    //handleShare={handleShare}
                                    //handleEdit={handleEdit}
                                    />
                                </li>
                            );
                        })}</ul>
                </div>
            </div>
        </div>
    );
}
