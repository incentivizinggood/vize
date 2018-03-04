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

        // These bindings are necessary to make `this` work in callbacks.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginCallback = this.loginCallback.bind(this);
    }

    loginCallback(error) {
        if (error) {
            this.setState({
                error: error.reason,
                success: false
            });
        } else {
            this.setState({
                error: null,
                success: true
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevent the default behavior for this event.
        let name = this.nameInput.value;
        let password = this.passwordInput.value;
        Meteor.loginWithPassword(name, password, this.loginCallback);
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
                    type="text"
                    placeholder="Username or email"
                    ref={x => (this.nameInput = x)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={x => (this.passwordInput = x)}
                />
                <input type="submit" value="Login" />
            </form>
        );
    }

    render() {
        if (this.state.success) {
            return <div className="page login">Login successful!</div>;
        }
        return (
            <div className="page login">
                {this.renderErrorMessage()}
                {this.renderLoginForm()}
            </div>
        );
    }
}
