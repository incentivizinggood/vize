import React from "react";
import "font-awesome/css/font-awesome.min.css";

import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

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
			email: "",
			companyName: "",
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
					Employee
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
					Employer
				</label>
			</>
		);

		const usernameInput = (
			<div className="form-group">
				<div className="icon-addon addon-md">
					<input
						type="text"
						placeholder="Username"
						className="form-control"
						name="username"
						id="username"
						autoFocus
						required
						value={this.state.username}
						onChange={this.handleInputChange}
					/>
					<label
						htmlFor="Username"
						className="glyphicon glyphicon-user"
						rel="tooltip"
						title="Username"
					/>
				</div>
			</div>
		);

		const emailInput = (
			<div className="form-group">
				<div className="icon-addon addon-md">
					<input
						type="email"
						name="email"
						id="email"
						className="form-control"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
					<label
						htmlFor="email"
						className="fa fa-envelope-o"
						rel="tooltip"
						title="email"
					/>
				</div>
			</div>
		);

		const companyNameInput = (
			<div className="form-group">
				<div className="icon-addon addon-md">
					<input
						type="text"
						name="companyName"
						id="companyName"
						className="form-control"
						placeholder="Company Name"
						value={this.state.companyName}
						onChange={this.handleInputChange}
					/>
					<label
						htmlFor="companyName"
						className="fa fa-building-o"
						rel="tooltip"
						title="companyName"
					/>
				</div>
			</div>
		);

		const passwordInput = (
			<div className="form-group">
				<div className="icon-addon addon-md   pwd-line-sm">
					<input
						type="password"
						name="password"
						id="password"
						className="form-control"
						placeholder="Password"
						required
						value={this.state.password}
						onChange={this.handleInputChange}
					/>
					<label
						htmlFor="password"
						className="fa fa-lock"
						rel="tooltip"
						title="password"
					/>
				</div>
			</div>
		);

		const registerForm = (
			<form
				id="register-form"
				style={{ display: "block" }}
				onSubmit={this.handleSubmit}
			>
				<h3 className="top-head-employer" align="center">
					Register
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
								Get Started
							</button>
						</div>
					</div>
				) : null}
			</form>
		);

		return (
			<div className="page register">
				{this.state.error ? <div>{this.state.error}</div> : null}
				<Header />
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
												Already have an account?{" "}
												<a href="/login"> Log In </a>
											</div>
											<div className="clearfix" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
