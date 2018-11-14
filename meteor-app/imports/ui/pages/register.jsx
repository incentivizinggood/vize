import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() === null ? null : "loggedIn",
			success: false,
			username: "",
			email: "",
			companyName: "",
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
		event.preventDefault(); // Prevent the default behavior for this event
		const createUserCallback = error => {
			if (error) console.error(error);
			this.setState({
				// Using slice here to remove the period from the error reason
				// so that it will work as a JSON key in the translation files.
				error: error ? error.reason.slice(0, -1) : null,
				success: !error,
			});
			if (this.state.success) {
				this.props.history.push("/");
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
					<T>registrationSuccess</T>
				</div>
			);
		}

		const roleInput = (
			<>
				<label
					className={
						this.state.role === "worker"
							? "role selected-role"
							: "role"
					}
					htmlFor="registerform-role-worker"
				>
					<input
						id="registerform-role-worker"
						name="role"
						type="radio"
						required
						value="worker"
						checked={this.state.role === "worker"}
						onChange={this.handleInputChange}
					/>
					<T>employee</T>
				</label>
				<label
					className={
						this.state.role === "company"
							? "role selected-role"
							: "role"
					}
					htmlFor="registerform-role-company"
				>
					<input
						id="registerform-role-company"
						name="role"
						type="radio"
						required
						value="company"
						checked={this.state.role === "company"}
						onChange={this.handleInputChange}
					/>
					<T>employer</T>
				</label>
			</>
		);

		const usernameInput = (
			<div className="form-group">
				<label
					htmlFor="Username"
					className="icon-addon addon-md"
					rel="tooltip"
					title="Username"
				>
					<FontAwesomeIcon icon="user" className="fa" />
					<input
						type="text"
						placeholder={t("username")}
						className="form-control"
						name="username"
						id="username"
						required
						value={this.state.username}
						onChange={this.handleInputChange}
					/>
				</label>
			</div>
		);

		const emailInput = (
			<div className="form-group">
				<label
					htmlFor="email"
					className="icon-addon addon-md"
					rel="tooltip"
					title="email"
				>
					<FontAwesomeIcon icon="envelope" className="fa" />
					<input
						type="email"
						name="email"
						id="email"
						className="form-control"
						placeholder={t("email")}
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
				</label>
			</div>
		);

		const companyNameInput = (
			<div className="form-group">
				<label
					htmlFor="companyName"
					className="icon-addon addon-md"
					rel="tooltip"
					title="companyName"
				>
					<FontAwesomeIcon icon="building" className="fa" />
					<input
						type="text"
						name="companyName"
						id="companyName"
						className="form-control"
						placeholder={t("companyName")}
						value={this.state.companyName}
						onChange={this.handleInputChange}
					/>
				</label>
			</div>
		);

		const passwordInput = (
			<div className="form-group">
				<label
					htmlFor="password"
					className="icon-addon addon-md pwd-line-sm"
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

		const registerForm = (
			<form
				id="register-form"
				style={{ display: "block" }}
				onSubmit={this.handleSubmit}
			>
				<h3 className="top-head-employer" align="center">
					<T>register</T>
				</h3>
				{roleInput}
				<br />

				{this.state.role === "worker" ||
				this.state.role === "company" ? (
					<div className="employer-fm">
						{usernameInput}

						{emailInput}

						{this.state.role === "company"
							? companyNameInput
							: null}

						{passwordInput}

						<div className="button-center">
							<button
								form="register-form"
								type="submit"
								className="button out-bodr-get1"
							>
								<T>createAccount</T>
							</button>
						</div>
					</div>
				) : null}
			</form>
		);

		return (
			<div className="page register">
				{this.state.error ? <div>{this.state.error}</div> : null}
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="container login-top-spce">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="panel panel-login register-work-employee">
								<div className="panel-body">
									<div className="row">
										<div className="col-lg-12">
											{registerForm}
										</div>
									</div>
								</div>
								<div className="panel-heading p-head">
									<div className="row">
										<div className="col-lg-12">
											<div className="text-center login-link-cs">
												<T>alreadyAccount</T>
												<Link to="/login">
													{" "}
													<T>login</T>{" "}
												</Link>
											</div>
											<div className="clearfix" />
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

export default withRouter(RegisterPage);
