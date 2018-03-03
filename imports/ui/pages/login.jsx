import React from "react";
import { createContainer } from "meteor/react-meteor-data";

/* The page where users can login to the app.
 */
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginCallback(err) {
        if (err) {
            this.setState({
                error: err.reason,
                success: false
            });
        } else {
            this.setState({
                error: null,
                success: true
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = document.getElementById("login-name").value;
        let password = document.getElementById("login-password").value;
        Meteor.loginWithPassword(name, password, err => {
            this.loginCallback(err);
        });
    }

    renderErrorMessage() {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else {
            return null;
        }
    }

    renderLoginForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    id="login-name"
                    type="text"
                    placeholder="Username or email"
                />
                <input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                />
                <input type="submit" value="Login" />
            </form>
        );
    }

    render() {
        if (this.state.success) {
            return <div className="page login"> Login successful!</div>;
        }
        return (
            <div className="page login">
                {this.renderErrorMessage()}
                {this.renderLoginForm()}
            </div>
        );
    }
}
