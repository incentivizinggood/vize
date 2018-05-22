import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
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
			password: "",
			role: "",
		};

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const { target } = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault(); // Prevent the default behavior for this event.
		const createUserCallback = error => {
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
			if (this.state.success) {
				FlowRouter.go("/");
			}
		};
		const options = {
			username: this.state.username,
			password: this.state.password,
			role: this.state.role,
		};
		Accounts.createUser(options, createUserCallback);
	}

	render() {
		if (this.state.success) {
			return <div className="page register">Sign up successful!</div>;
		}
		return (
			<div className="page register">
				{this.state.error ? <div>{this.state.error}</div> : null}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="registerform-username">
						Username
						<input
							id="registerform-username"
							name="username"
							type="text"
							placeholder="Username"
							required
							value={this.state.username}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="registerform-password">
						Password
						<input
							id="registerform-password"
							name="password"
							type="password"
							placeholder="Password"
							required
							value={this.state.password}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="registerform-role-worker">
						<input
							id="registerform-role-worker"
							name="role"
							type="radio"
							required
							value="worker"
							checked={this.state.role === "worker"}
							onChange={this.handleInputChange}
						/>
						I am a worker
					</label>
					<label htmlFor="registerform-role-company">
						<input
							id="registerform-role-company"
							name="role"
							type="radio"
							required
							value="company"
							checked={this.state.role === "company"}
							onChange={this.handleInputChange}
						/>
						I am a company
					</label>
					<input type="submit" value="Sign Up" />
				</form>
			</div>
		);
	}
}
