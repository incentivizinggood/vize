import React from "react";
import { createContainer } from "meteor/react-meteor-data";

/* The page where users can login to the app.
 */
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push("/");
            }
        });
    }

    render() {
        const error = this.state.error;
        return (
            <div className="page login">
            <div className="modal show">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="text-center">Log In</h1>
                        </div>
                        <div className="modal-body">
                            {error.length > 0 ? (
                                <div className="alert alert-danger fade in">
                                    {error}
                                </div>
                            ) : (
                                ""
                            )}
                            <form
                                id="login-form"
                                className="form col-md-12 center-block"
                                onSubmit={this.handleSubmit}
                            >

                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="signup-email"
                                        className="form-control input-lg"
                                        placeholder="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="signup-password"
                                        className="form-control input-lg"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        id="login-button"
                                        className="btn btn-lg btn-primary btn-block"
                                        value="Log In"
                                    />
                                </div>
                                <div className="form-group">
                                    <p className="text-center">
                                        Don't have an account? <a href="/register"><strong>Sign up </strong></a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div
                            className="modal-footer"
                            style={{ borderTop: 0 }}
                        />
                    </div>
                </div>
            </div>
          </div>




                /*}<section className="sectionContainer">
                    <div>
                        <h2>Credentials</h2>
                        <form method="post" action="#">
                            <p>
                                <input
                                    type="text"
                                    name="login"
                                    value=""
                                    placeholder="Username or email"
                                />
                            </p>
                            <p>
                                <input
                                    type="password"
                                    name="password"
                                    value=""
                                    placeholder="Password"
                                />
                            </p>

                            <p className="remember_me">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="remember_me"
                                        id="remember_me"
                                    />
                                </label>
                            </p>
                        </form>
                    </div>
                </section>
            </div>*/
        );
    }
}
