import React from "react";

/* The page where users can login to the app.
 */
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: Meteor.userId() === null ? null : "Already loged in",
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
        let loginCallback = error => {
            this.setState({
                error: error ? error.reason : null,
                success: !error
            });
        };
        Meteor.loginWithPassword(
            this.state.username,
            this.state.password,
            loginCallback
        );
    }

    render() {
        if (this.state.success) {
            return <div className="page login">Login successful!</div>;
        }
        return (
            <div className="page login">
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
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}
