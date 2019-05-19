import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

import InnerForm from "./register-inner-form.jsx";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialValues = {
	username: "",
	email: "",
	companyName: "",
	password: "",
	role: "",
};

const validate = values => {
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
};

const onSubmit = history => (values, actions) => {
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
			actions.resetForm(initialValues);
			// checks to see if the current page is the write a reivew page.
			// if the current page is write a review page and a register is successful
			// there should be no redirect so that the user can stay on the write a review page
			if (
				!(
					window.location.pathname.includes("/write-review") ||
					window.location.pathname.includes("/submit-salary-data")
				)
			) {
				history.push("/");
			}
		}
	};
	const options = {
		username: values.username,
		password: values.password,
		role: values.role,
	};
	Accounts.createUser(options, createUserCallback);
};

const RegisterForm = props => (
	<Formik
		initialValues={initialValues}
		validate={validate}
		onSubmit={onSubmit(props.history)}
	>
		<InnerForm />
	</Formik>
);

export default withRouter(RegisterForm);
