import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";

import * as schemas from "imports/ui/form-schemas";
import { login } from "imports/ui/auth";

import InnerForm from "./login-inner-form";

const initialValues = {
	username: "",
	password: "",
};

const schema = yup.object().shape({
	username: schemas.username.required(),
	password: schemas.password.required(),
});

const onSubmit = history => (values, actions) => {
	login(values.username, values.password)
		.then(x => {
			console.log("then = ", x);
			actions.resetForm(initialValues);
			if (
				!(
					window.location.pathname.includes("/write-review") ||
					window.location.pathname.includes("/submit-salary-data")
				)
			) {
				history.push("/");
			}
		})
		.catch(error => {
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
		});
};

const LoginForm = props => (
	<Formik
		initialValues={initialValues}
		validationSchema={schema}
		onSubmit={onSubmit(props.history)}
	>
		<InnerForm />
	</Formik>
);

export default withRouter(LoginForm);
