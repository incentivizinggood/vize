import React from "react";

/* A form where users can change their passwords.
 */
export default class PasswordChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() !== null ? null : "Not loged in",
			success: false,
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: "",
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
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault(); // Prevent the default behavior for this event.
		let callback = error => {
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
		};

		// Double check to avoid typos.
		if (this.state.newPassword !== this.state.repeatNewPassword) {
			callback({ reason: "New passwords do not match." });
			return;
		}

		Accounts.changePassword(
			this.state.oldPassword,
			this.state.newPassword,
			callback
		);
	}

	render() {
		if (this.state.success) {
			return (
				<div className="password-reset">Password reset successful!</div>
			);
		}
		return (
			<div className="password-reset">
				{this.state.error ? <div>{this.state.error}</div> : null}
				<form onSubmit={this.handleSubmit}>
					<label>
						Current password
						<input
							name="oldPassword"
							type="password"
							placeholder="Password"
							required
							value={this.state.oldPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<label>
						New password
						<input
							name="newPassword"
							type="password"
							placeholder="New Password"
							required
							value={this.state.newPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<label>
						Repeat new password
						<input
							name="repeatNewPassword"
							type="password"
							placeholder="New Password"
							required
							value={this.state.repeatNewPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<input type="submit" value="Change Password" />
				</form>
			</div>
		);
	}
}
