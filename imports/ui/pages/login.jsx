import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.login");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() === null ? null : "loggedIn",
			success: false,
			username: "",
			password: "",
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
		const loginCallback = error => {
			if (error) console.error(error);
			this.setState({
				error: error ? error.reason : null,
				success: !error,
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
			return (
				<div className="page login">
					<T>success</T>
				</div>
			);
		}
		return (
			<div className="page login">
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="loginform-username">
						<T>username</T>
						<input
							id="loginform-username"
							name="username"
							type="text"
							placeholder={t("username")}
							required
							value={this.state.username}
							onChange={this.handleInputChange}
						/>
					</label>
					<label htmlFor="loginform-password">
						<T>password</T>
						<input
							id="loginform-password"
							name="password"
							type="password"
							placeholder={t("password")}
							required
							value={this.state.password}
							onChange={this.handleInputChange}
						/>
					</label>
					<input type="submit" value={t("submit")} />
				</form>
			</div>
		);
	}
}
