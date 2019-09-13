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
	username: schemas.username.required(
		"Nombre de Usuario es un campo requerido"
	),
	email: yup
		.string()
		.email("Correo Electrónico debe ser válido")
		.required("Correo Electrónico es un campo requerido"),
	companyName: schemas.companyName,
	password: schemas.password.required("Contraseña es un campo requerido"),
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
				formErrors.username = "Nombre de usuario ya existe";
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

// defining global variable because I do not want the value to change when user
// navigates from the register or login page. Esentially making it static
let userRole = localStorage.getItem("userRole");

function RegisterForm(props) {
	if (props.location.state) {
		if (
			props.location.state.prevPath !== "/register" &&
			props.location.state.prevPath !== "/login"
		) {
			userRole = "worker";

			if (props.location.state.prevPath === "/for-employers") {
				userRole = "company";
			}
			// save the role to local storage so that the variable is not reset when page is refreshed
			localStorage.setItem("userRole", userRole);
		}
	}
	initialValues["role"] = userRole;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(props.history)}
		>
			<InnerForm {...props} userRole={userRole} />
		</Formik>
	);
}

export default withRouter(RegisterForm);
