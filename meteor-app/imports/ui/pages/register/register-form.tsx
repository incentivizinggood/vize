import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";

import { Accounts } from "meteor/accounts-base";

import * as schemas from "imports/ui/form-schemas";

import InnerForm from "./register-inner-form";

const initialValues = {
	username: "",
	email: "",
	companyName: "",
	password: "",
	role: "",
};

const schema = yup.object().shape({
	username: schemas.username.required(),
	email: yup
		.string()
		.email()
		.required(),
	companyName: schemas.companyName,
	password: schemas.password.required(),
	role: yup
		.mixed()
		.oneOf(["worker", "company"])
		.required(),
});

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
		validationSchema={schema}
		onSubmit={onSubmit(props.history)}
	>
		<InnerForm />
	</Formik>
);

export default withRouter(RegisterForm);
