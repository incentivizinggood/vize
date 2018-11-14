import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
class LoginPage extends React.Component {
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

		const usernameInput = (
			<div className="form-group">
				<label
					htmlFor="username"
					className="icon-addon addon-md"
					rel="tooltip"
					title="Username"
				>
					<FontAwesomeIcon icon="user" className="fa" />
					<input
						type="text"
						className="form-control"
						name="username"
						id="username"
						placeholder={t("username")}
						required
						value={this.state.username}
						onChange={this.handleInputChange}
					/>
				</label>
			</div>
		);

		const passwordInput = (
			<div className="form-group">
				<label
					htmlFor="password"
					className="icon-addon addon-md"
					rel="tooltip"
					title="password"
				>
					<FontAwesomeIcon icon="lock" className="fa" />
					<input
						type="password"
						name="password"
						id="password"
						className="form-control"
						placeholder={t("password")}
						required
						value={this.state.password}
						onChange={this.handleInputChange}
					/>
				</label>
			</div>
		);

		const loginForm = (
			<form
				id="login-form"
				style={{ display: "block" }}
				onSubmit={this.handleSubmit}
			>
				<div className="login-fm">
					{usernameInput}

					{passwordInput}

					<div className="form-group text-center" />

					<div className="button-center">
						<button
							form="login-form"
							type="submit"
							className="enterTriggers"
							value={t("submit")}
						>
							<T>login</T>
						</button>
					</div>

					<div className="form-group">
						<div className="row">
							<div className="col-lg-12">
								<div className="text-center reg">
									<T>noAccount</T>
									<Link to="/register">
										{" "}
										<T>register</T>
									</Link>
								</div>
								<br />
							</div>
						</div>
					</div>
				</div>
			</form>
		);

		return (
			<div className="page login">
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="container  login-top-spce">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="panel panel-login">
								<div className="panel-heading">
									<div className="row">
										<div className="col-xs-12">
											<br />
											<h3
												className="top-head-employer"
												align="center"
											>
												<T>login</T>
											</h3>
											<hr />
										</div>
									</div>
								</div>
								<div className="panel-body">
									<div className="row">
										<div className="col-lg-12">
											{loginForm}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Dialog />
				<Footer />
			</div>
		);
	}
}

export default withUpdateOnChangeLocale(LoginPage);
