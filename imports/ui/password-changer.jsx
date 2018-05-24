import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.passwordChanger");
const T = i18n.createComponent(t);

/* A form where users can change their passwords.
 */
export default class PasswordChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() !== null ? null : "Not logged in",
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
		const callback = error => {
			if (error) console.error(error);
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
		};

		// Double check to avoid typos.
		if (this.state.newPassword !== this.state.repeatNewPassword) {
			callback({ reason: "New passwords do not match" });
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
				<div className="password-reset">
					<T>success</T>
				</div>
			);
		}
		return (
			<div className="password-reset">
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="passwordChangeForm-oldPassword">
						<T>oldPassword</T>
						<input
							id="passwordChangeForm-oldPassword"
							name="oldPassword"
							type="password"
							placeholder={t("oldPassword")}
							required
							value={this.state.oldPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="passwordChangeForm-newPassword">
						<T>newPassword</T>
						<input
							id="passwordChangeForm-newPassword"
							name="newPassword"
							type="password"
							placeholder={t("newPassword")}
							required
							value={this.state.newPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="passwordChangeForm-repeatNewPassword">
						<T>repeatNewPassword</T>
						<input
							id="passwordChangeForm-repeatNewPassword"
							name="repeatNewPassword"
							type="password"
							placeholder={t("newPassword")}
							required
							value={this.state.repeatNewPassword}
							onChange={this.handleInputChange}
						/>
					</label>
					<input type="submit" value={t("submit")} />
				</form>
			</div>
		);
	}
}
