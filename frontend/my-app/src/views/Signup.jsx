import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import RedirectLink from '../components/RedirectLink';
import "./Signup.css";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleEmail = useCallback((event) => {
        setError('')
        setEmail(event.target.value)
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
        if (!email) {
            setError('*Email cannot be blank!')
        } else if (!password) {
            setError('*Password cannot be blank!')
        } else if (confirmPassword !== password) {
            setError('*Password and confirm password does not match!')
        } else {
            /*connect with backend*/
            navigate('/')
            alert("Sign up Successfully!")
        }
    })
    return (
        <form className='signup' onSubmit={handleSignup}>
            <h1>Sign Up</h1>
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

                <Form
                    type="password"
                    name="confirmPassword"
                    action={handleConfirmPassword}
                    placeholder="Confirm Password"
                ></Form>
                <button type="submit">Sign Up</button>
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