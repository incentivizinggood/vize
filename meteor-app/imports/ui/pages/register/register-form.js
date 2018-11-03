import { withFormik } from "formik";

import { FlowRouter } from "meteor/kadira:flow-router";
import { Accounts } from "meteor/accounts-base";

import InnerForm from "./register-inner-form.jsx";

const RegisterForm = withFormik({
	initialValues: {
		username: "",
		email: "",
		companyName: "",
		password: "",
		role: "",
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
		const createUserCallback = error => {
			if (error) {
				console.error(error);

				// Errors to display on form fields
				const formErrors = {};

				actions.setErrors(formErrors);
				actions.setSubmitting(false);
			} else {
				actions.resetForm(this.initialValues);
				FlowRouter.go("/");
			}
		};
		const options = {
			username: this.state.username,
			password: this.state.password,
			role: this.state.role,
		};
		Accounts.createUser(options, createUserCallback);
	},
})(InnerForm);

export default RegisterForm;
