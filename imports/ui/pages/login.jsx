import React from "react";
import { createContainer } from "meteor/react-meteor-data";

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
                <section className="sectionContainer">
                    <div>
                        <h2>Credentials</h2>
                        <form method="post" onSubmit="" action="index.html">
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
            </div>
        );
    }
}
