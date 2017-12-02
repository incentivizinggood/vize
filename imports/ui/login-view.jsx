import React, { Component } from 'react'
// import { withHistory, Link } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'
import {About} from './about-view.jsx'

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if(err){
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    render(){
        const error = this.state.error;
        return (
            <html>
            <head>
                <title>Login</title>
            </head>
                <body>
                    <section class = "sectionContainer">
                        <div>
                            <h2>Credentials</h2>
                            <form method = "post" onSubmit="" action="index.html">
                                <p><input type="text" name="login" value="" placeholder="Username or email"/></p>
                                <p><input type="password" name="password" value="" placeholder="Password"/></p>

                                <p class = "remember_me">
                                    <label>
                                        <input type = "checkbox" name = "remember_me" id = "remember_me"/>


                                    </label>
                                </p>
                            </form>
                        </div>
                    </section>
                </body>
            </html>
        );
    }
}





/*
import React, {Component} from 'react';

export default class Login extends Component {
    render() {
        return (
            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="../imports.css"/>
            </head>
                <body>
                <div className='container'>
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/>
                                Remember Me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit-button">Sign in</button>
                        <button type="signup-button" href={""}>Sign up</button>
                    </form>
                    <p> Forgot your password? <a href={"google.com"}>Click Here!</a></p>
                </div>
                </body>
            </html>
        );
    }
}


Remove this tag
Don't have an account? Register <Link to="/signup">here</Link>
*/