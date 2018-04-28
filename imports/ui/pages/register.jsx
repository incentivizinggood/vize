import React from "react";
import { Accounts } from "meteor/accounts-base";

/* The page where users can create an account.
 */
export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: false,
            username: "",
            password: ""
        };

        // These bindings are necessary to make `this` work in callbacks.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevent the default behavior for this event.
        let createUserCallback = error => {
            this.setState({
                error: error ? error.reason : null,
                success: !error
            });
        };
        Accounts.createUser(
            { username: this.state.username, password: this.state.password },
            createUserCallback
        );
    }

    render() {
        if (this.state.success) {
            return <div className="page register">Sign up successful!</div>;
        }
        return (
            <div className="page register">
                {this.state.error ? <div>{this.state.error}</div> : null}
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        autoFocus
                        required
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}
