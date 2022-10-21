import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import RedirectLink from '../components/RedirectLink';
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleUname = useCallback((event) => {
        setError('')
        setUname(event.target.value)
    }, []);

    const handlePassword = useCallback((event) => {
        setError('')
        setPassword(event.target.value)
    }, [])

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        if (!uname) {
            setError('*Username cannot be blank!')
        } else if (!password) {
            setError('*Password cannot be blank!')
        } else {
            /*connect with backend*/
            navigate('/homepage')
        }
    })

    return (
        <form className='login' onSubmit={handleLogin}>
            <h1>Login</h1>
            <div class="container">
                <Form
                    type="text"
                    name="uname"
                    action={handleUname}
                    placeholder="Username"
                ></Form>
                <Form
                    type="password"
                    name="password"
                    action={handlePassword}
                    placeholder="Password"
                ></Form>
                <button className="button1" type="submit">Login</button>
                {error && (
                    <p className="error"> {error} </p>
                )}
            </div>

            <form className="center">
                <RedirectLink message="Do not have an account?" link="Sign up here!" href="/signup" />
            </form>
        </form>
    );
}