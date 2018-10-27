import { withFormik } from "formik";

import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";

import InnerForm from "./login-inner-form.jsx";

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

				// Errors to display on form fields
				const formErrors = {};

				if (error.reason === "User not found") {
					formErrors.username = "User not found";
				}
				if (error.reason === "Incorrect password") {
					// TODO: clear the password input on this error
					formErrors.password = "Incorrect password";
				}

				actions.setErrors(formErrors);
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
})(InnerForm);

export default LoginForm;
