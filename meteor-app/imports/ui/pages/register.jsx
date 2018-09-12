import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.register");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
export default class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() === null ? null : "loggedIn",
			success: false,
			username: "",
			password: "",
			role: "",
		};

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
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
			if (error) console.error(error);
			this.setState({
				// Using slice here to remove the period from the error reason
				// so that it will work as a JSON key in the translation files.
				error: error ? error.reason.slice(0, -1) : null,
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
			return (
				<div className="page register">
					<T>success</T>
				</div>
			);
		}
		return (
			<div className="page register">
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="registerform-username">
						<T>username</T>
						<input
							id="registerform-username"
							name="username"
							type="text"
							placeholder={t("username")}
							required
							value={this.state.username}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="registerform-password">
						<T>password</T>
						<input
							id="registerform-password"
							name="password"
							type="password"
							placeholder={t("password")}
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
						<T>role.worker</T>
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
						<T>role.company</T>
					</label>
					<input type="submit" value={t("submit")} />
				</form>
			</div>
		);
	}
}
