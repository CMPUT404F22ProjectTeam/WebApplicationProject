import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import RedirectLink from '../components/RedirectLink';
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleEmail = useCallback((event) => {
        setError('')
        setEmail(event.target.value)
    }, []);

    const handlePassword = useCallback((event) => {
        setError('')
        setPassword(event.target.value)
    }, [])

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        if (!email) {
            setError('*Email cannot be blank!')
        } else if (!password) {
            setError('*Password cannot be blank!')
        } else {
            /*connect with backend*/
            navigate('/home')
        }
    })

    return (
        <form className='login' onSubmit={handleLogin}>
            <h1>Login</h1>
            <div class="container">
                <Form
                    type="email"
                    name="email"
                    action={handleEmail}
                    placeholder="Email"
                ></Form>
                <Form
                    type="password"
                    name="password"
                    action={handlePassword}
                    placeholder="Password"
                ></Form>
                <button type="submit">Login</button>
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