import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Post/Form';
import RedirectLink from '../../components/Message/RedirectLink';
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleName = useCallback((event) => {
        setError('')
        setName(event.target.value)
    }, []);

    const handlePassword = useCallback((event) => {
        setError('')
        setPassword(event.target.value)
    }, [])

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        if (!name) {
            setError('*Name cannot be blank!')
        } else if (!password) {
            setError('*Password cannot be blank!')
        } else {
            /*connect with backend*/
            navigate('/home')
        }
    }, [name, password])

    return (
        <form className='login' onSubmit={handleLogin}>
            <h1>Login</h1>
            <div class="container">
                <Form
                    type="text"
                    name="username"
                    action={handleName}
                    placeholder="Name"
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