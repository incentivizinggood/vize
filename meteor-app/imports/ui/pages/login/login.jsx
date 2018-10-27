import React from "react";
import { withFormik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm({ errors, isSubmitting }) {
	const usernameInput = (
		<div className="form-group">
			<label
				htmlFor="username"
				className="icon-addon addon-md"
				rel="tooltip"
				title="Username"
			>
				<FontAwesomeIcon icon="user" className="fa" />
				<Field
					type="text"
					className="form-control"
					name="username"
					id="username"
					placeholder={t("username")}
					required
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
				<Field
					type="password"
					name="password"
					id="password"
					className="form-control"
					placeholder={t("password")}
					required
				/>
			</label>
		</div>
	);

	return (
		<Form>
			<div className="login-fm">
				{usernameInput}

				{passwordInput}

				<div className="form-group text-center" />

				<div className="button-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="enterTriggers"
					>
						<T>login</T>
					</button>
				</div>

				<div className="form-group">
					<div className="row">
						<div className="col-lg-12">
							<div className="text-center reg">
								<T>noAccount</T>
								<a href="/register">
									{" "}
									<T>register</T>
								</a>
							</div>
							<br />
						</div>
					</div>
				</div>
			</div>
			<div>{JSON.stringify(errors)}</div>
		</Form>
	);
}

const LoginForm = withFormik({
	initialValues: {
		username: "",
		password: "",
	},
	validate(values) {
		const errors = {};

		if (!values.username) {
			errors.username = "Required";
		}

		if (!values.password) {
			errors.password = "Required";
		}

		return errors;
	},
	handleSubmit(values, actions) {
		const loginCallback = error => {
			if (error) {
				console.error(error);
				actions.setSubmitting(false);
			} else {
				actions.resetForm(this.initialValues);
				FlowRouter.go("/");
			}
		};

		Meteor.loginWithPassword(
			values.username,
			values.password,
			loginCallback
		);
	},
})(withUpdateOnChangeLocale(InnerForm));

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<div className="page login">
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
										<LoginForm />
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

export default LoginPage;
