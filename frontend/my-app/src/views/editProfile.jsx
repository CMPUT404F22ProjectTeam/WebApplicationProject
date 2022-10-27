import React from 'react'
import './home/homePage.css'
import Navbar from '../components/Navbar/Navbar';
import Form from '../components/Form';
import { Link } from "react-router-dom";
export default function EditProfile() {
    return (
        <div className='homePage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <Link to={`./../`} className="back">x</Link>
                <div className='container'>
                    <form className='post_information' >
                        <Form
                            type="text"
                            name="userName"
                            //action={handleName}
                            placeholder="new name"
                        />
                        <Form
                            type="text"
                            name="github"
                            //action={handleGit}
                            placeholder="github name"
                        />
                        <button class="btn" type="submit" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
