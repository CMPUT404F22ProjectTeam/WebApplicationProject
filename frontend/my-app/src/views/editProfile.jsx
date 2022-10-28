import React, { useState, useCallback } from 'react'
import './home/homePage.css'
import Navbar from '../components/Navbar/Navbar';
import Form from '../components/Form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
export default function EditProfile() {
    const AUTHOR_ID = "111";
    const base_url = "http://127.0.0.1:8000";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [github, setGithub] = useState('');

    const handleName = useCallback((event) => {
        setName(event.target.value)
    }, [])

    const handleGit = useCallback((event) => {
        setGithub(event.target.value)
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        axios.post(`${base_url}/authors/${AUTHOR_ID}/`, {
            username: { name },
            github: { github },
        })
            .then((response) => {
                console.log(response);
                navigate('/')
            })
            .catch((e) => {
                console.log(e);
            });
    })

    return (
        <div className='homePage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <Link to={`./../`} className="back">x</Link>
                <div className='container'>
                    <form className='post_information' onSubmit={handleSubmit} >
                        <Form
                            type="text"
                            name="userName"
                            action={handleName}
                            placeholder="new name"
                        />
                        <Form
                            type="text"
                            name="github"
                            action={handleGit}
                            placeholder="github name"
                        />
                        <button class="btn" type="submit" onClick={handleSubmit} >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
