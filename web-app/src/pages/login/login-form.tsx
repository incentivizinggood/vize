import React from "react";
import { Formik, FormikHelpers, FormikErrors } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";

import * as schemas from "src/form-schemas";
import { login } from "src/auth";

import InnerForm from "./login-inner-form";

const schema = yup
	.object()
	.shape({
		loginId: yup
			.string()
			.trim()
			.required(
				"Ingrese su dirección de correo electrónico o nombre de usuario."
			),
		password: schemas.password.required("Contraseña es un campo requerido"),
	})
	.required();

type Values = yup.InferType<typeof schema>;

const initialValues: Values = {
	loginId: "",
	password: "",
};

const onSubmit = (history: History) => (
	values: Values,
	actions: FormikHelpers<Values>
) => {
	login(values.loginId, values.password)
		.then(x => {
			console.log("then = ", x);
			actions.resetForm({ values: initialValues });

			// TODO: use query params so that login redirects user back to where they were when they login
			if (
				!(
					window.location.pathname.includes("/write-review") ||
					window.location.pathname.includes("/submit-salary-data") ||
					window.location.pathname.includes("/recurso")
				)
			) {
				history.push("/");
			}
		})
		.catch(error => {
			console.error("Login error is", error);

			// Errors to display on form fields
			const formErrors: FormikErrors<Values> = {};

			if (
				error.error.errors.includes(
					"No account was found for that email or username."
				)
			) {
				formErrors.loginId =
					"No se encontró ninguna cuenta para ese correo electrónico o nombre de usuario.";
			}

			if (error.error.errors.includes("password is incorrect")) {
				// TODO: clear the password input on this error
				formErrors.password = "Contraseña incorrecta";
			}

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});
};

export default function LoginForm(): JSX.Element {
	const history = useHistory();

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(history)}
		>
			<InnerForm />
		</Formik>
	);
}
