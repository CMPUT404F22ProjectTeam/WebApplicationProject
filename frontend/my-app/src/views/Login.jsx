import React, { Component } from 'react';
import Form from '../components/Form';
import RedirectLink from '../components/RedirectLink';
import "./Login.css";

const initState = {
    email: "",
    password: "",
    status: [],
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    save = async (e) => {
        e.preventDefault();
        const {
            email,
            password,
        } = this.state;

        if (!email) {
            this.setState({
                flash: { status: "is-danger", msg: "Email cannot be blank!" },
            });
        } else {
            this.props.toggle();
        }

        if (!password) {
            this.setState({
                flash: { status: "is-danger", msg: "Password cannot be blank!" },
            });
        } else {
            this.props.toggle();
        }
    };

    /*error message handler*/
    handleChange = (e) =>
        this.setState({ [e.target.name]: e.target.value, error: "" });

    handleClick = () => {
        this.props.toggle();
    };

    render() {
        const {
            email,
            password,
        } = this.state;
        return (
            <form class='login' onSubmit={this.save}>
                <h1>Login</h1>

                <Form
                    type="email"
                    name="email"
                    action={this.handleChange}
                    placeholder="Email"
                    value={email}
                ></Form>

                <Form
                    type="password"
                    name="password"
                    action={this.handleChange}
                    placeholder="Password"
                    value={password}
                ></Form>

                <form class="center">
                    <RedirectLink message="Forgot Password?" link="Click here!" href="/reset" />
                    <a href="/Home" class="button" type="submit" onClick={this.save}>Login</a>
                    <RedirectLink message="Do not have an account?" link="Sign up here!" href="/signup" />
                </form>
            </form>
        );
    }
}