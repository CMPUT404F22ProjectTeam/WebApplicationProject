import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Post/Form';
import RedirectLink from '../../components/Message/RedirectLink';
import FormData from 'form-data';
import axios from "axios";
import "./Login.css";

export default function Signup() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    let formData = new FormData();

    const handleUserName = useCallback((event) => {
        setError('')
        setUserName(event.target.value)
    }, []);

    const handlePassword = useCallback((event) => {
        setError('')
        setPassword(event.target.value)
    }, []);

    const handleConfirmPassword = useCallback((event) => {
        setError('')
        setConfirmPassword(event.target.value)
    }, []);

    const handleSignup = useCallback(async (e) => {
        e.preventDefault()
        if (!userName) {
            setError('*UserName cannot be blank!')
        } else if (!password) {
            setError('*Password cannot be blank!')
        } else if (confirmPassword !== password) {
            setError('*Password and confirm password does not match!')
        } else {
            formData.append('username', userName)
            formData.append('password', password)
            axios
                .put(`https://fallprojback.herokuapp.com/signup/`, formData)
                .then((response) => {
                    console.log(response);
                    alert("Sign up Successfully!")
                    navigate('/')
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [userName, password, confirmPassword])
    return (
        <form className='signup' onSubmit={handleSignup}>
            <h1>Sign Up</h1>
            <div class="container">
                <Form
                    type="text"
                    name="userName"
                    action={handleUserName}
                    placeholder="UserName"
                ></Form>

                <Form
                    type="password"
                    name="password"
                    action={handlePassword}
                    placeholder="Password"
                ></Form>

                <Form
                    type="password"
                    name="confirmPassword"
                    action={handleConfirmPassword}
                    placeholder="Confirm Password"
                ></Form>
                <button className="button1" type="submit">Sign Up</button>
                {error && (
                    <p className="error"> {error} </p>
                )}
            </div>

            <form className="center">
                <RedirectLink message="Already have an account?" link="Back to Login" href="/" />
            </form>
        </form>
    );
}