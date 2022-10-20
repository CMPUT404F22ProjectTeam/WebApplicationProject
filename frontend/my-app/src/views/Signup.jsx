import React, { Component } from 'react';
import Form from '../components/Form';
import RedirectLink from '../components/RedirectLink';
import "./Signup.css";

const initState = {
    email: "",
    password: "",
    confirmPassword: "",
    status: [],
};

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    save = async (e) => {
        e.preventDefault();
        const {
            email,
            password,
            confirmPassword,
        } = this.state;

        if (!email) {
            this.setState({
                flash: { status: "is-danger", msg: "Email cannot be blank!" },
            });
        } else if (!password) {
            this.setState({
                flash: { status: "is-danger", msg: "Password cannot be blank!" },
            });
        } else if (confirmPassword !== password) {
            this.setState({
                flash: { status: "is-danger", msg: "The passwords does not match!" },
            });
        } else {
            this.props.toggle();
        }
    };

    /*error message handler*/
    handleChange = (e) =>
        this.setState({ [e.target.name]: e.target.value, error: "" });

    render() {
        const {
            email,
            password,
            confirmPassword,
        } = this.state;
        return (
            <form className='signup' onSubmit={this.save}>
                <h1>Sign Up</h1>
                <div class="container">
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

                    <Form
                        type="password"
                        name="confirmPassword"
                        action={this.handleChange}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                    ></Form>
                    {/* <a href="/" className="button" type="submit">Sign Up</a> */}
                    <button type="submit">Sign Up</button>
                </div>
                {this.state.flash && (
                    <div className='flash'>
                        <div className={`notification ${this.state.flash.status}`}>
                            {this.state.flash.msg}
                        </div>
                    </div>
                )}

                <form className="center">
                    <RedirectLink message="Already have an account?" link="Back to Login" href="/" />
                </form>
            </form>
        );
    }
}