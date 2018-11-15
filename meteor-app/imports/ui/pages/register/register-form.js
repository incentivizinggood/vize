import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

import InnerForm from "./register-inner-form.jsx";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = props => (
	<Formik
		initialValues={{
			username: "",
			email: "",
			companyName: "",
			password: "",
			role: "",
		}}
		validate={values => {
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
		}}
		onSubmit={(values, actions) => {
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
					props.history.push("/");
				}
			};
			const options = {
				username: values.username,
				password: values.password,
				role: values.role,
			};
			Accounts.createUser(options, createUserCallback);
		}}
	>
		<InnerForm />
	</Formik>
);

export default withRouter(RegisterForm);
