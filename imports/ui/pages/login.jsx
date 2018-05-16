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

    handleSubmit(e) {
        e.preventDefault();
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-" +
            "").value;
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push("/");
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
            if (this.state.success) {
                FlowRouter.go("/");
            }
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
                <section className="sectionContainer">
                    <div>
                        <h2>Credentials</h2>
                        <form method="post" onSubmit="" action="index.html">
                            <p>
                                <input
                                    type="text"
                                    name="login"
                                    value= ""
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
                {this.state.error ? <div>{this.state.error}</div> : null}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            autoFocus
                            required
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}
