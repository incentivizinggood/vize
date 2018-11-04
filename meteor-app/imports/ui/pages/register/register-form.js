import { withFormik } from "formik";

import { FlowRouter } from "meteor/kadira:flow-router";
import { Accounts } from "meteor/accounts-base";

import InnerForm from "./register-inner-form.jsx";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

		if (values.email && !emailRegex.test(values.email)) {
			errors.email = "Not a valid email";
		}

		return errors;
	},
	handleSubmit(values, actions) {
		const createUserCallback = error => {
			if (error) {
				console.error(error);

				// Errors to display on form fields
				const formErrors = {};

				if (error.reason === "Username already exists.") {
					formErrors.username = "Username already exists";
				}

				actions.setErrors(formErrors);
				actions.setSubmitting(false);
			} else {
				actions.resetForm(this.initialValues);
				FlowRouter.go("/");
			}
		};
		const options = {
			username: values.username,
			password: values.password,
			role: values.role,
		};
		Accounts.createUser(options, createUserCallback);
	},
})(InnerForm);

export default RegisterForm;
