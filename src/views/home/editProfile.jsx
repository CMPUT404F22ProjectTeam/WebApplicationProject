import React, { useState, useCallback } from 'react'
import './homePage.css'
import Navbar from '../../components/Navbar/Navbar';
import Form from '../../components/Post/Form';
import { Link, useNavigate } from "react-router-dom";
import FormData from 'form-data';
import axios from 'axios';


const base_url = process.env.REACT_APP_CURRENT_URL;

export default function EditProfile() {
    const AUTHOR_ID = "1111111111";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [github, setGithub] = useState('');
    const [error, setError] = useState('');
    let data = new FormData()

    const handleName = useCallback((event) => {
        setError('')
        setName(event.target.value)
    }, [])

    const handleGit = useCallback((event) => {
        setError('')
        setGithub(event.target.value)
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (name) {
            data.append('username', name)
        }
        if (github) {
            data.append('github', github)
        }
        axios
            .post(`${base_url}/authors/${AUTHOR_ID}/`, data)
            .then((response) => {
                console.log(response);
                navigate('/home')
            })
            .catch((e) => {
                setError(e)
                console.log(e);
            });
        this.props.toggle();
    }, [name, github]
    )

    return (
        <div className='homePage'>
            <div className='bar'>
                <Navbar />
            </div>
            <div className='split profile'>
                <Link to={`./../home`} className="back">x</Link>
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
                        <div className="field is-clearfix">
                            <button class="btn" type="submit" >
                                Submit
                            </button>
                        </div>
                        <p className="flash">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
