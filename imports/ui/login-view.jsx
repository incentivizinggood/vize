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
            <div className="modal show">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            { error.length > 0 ?
                                <div className="alert alert-danger fade in">{error}</div>
                                :''}
                            <form  id="login-form"
                                   className="form col-md-12 center-block"
                                   onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                           id="login-email"
                                           className="form-control input-lg"
                                           placeholder="email"/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           id="login-password"
                                           className="form-control input-lg"
                                           placeholder="password"/>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit"
                                           id="login-button"
                                           className="btn btn-primary btn-lg btn-block"
                                           value="Login" />
                                    <input type="submit"
                                           id="login-button"
                                           className="btn btn-primary btn-lg btn-block"
                                           value="register" />
                                </div>
                                <div className="form-group text-center">
                                    <p className="text-center">

                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{borderTop: 0}}></div>
                    </div>
                </div>
            </div>
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