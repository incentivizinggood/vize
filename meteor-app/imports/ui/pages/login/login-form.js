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
