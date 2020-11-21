import React from "react";
import { Formik, FormikHelpers, FormikErrors } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";

import * as analytics from "src/startup/analytics";
import * as schemas from "src/form-schemas";
import { register } from "src/auth";

import { InnerForm } from "./register-inner-form";

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email("Correo Electrónico debe ser válido")
			.required("Correo Electrónico es un campo requerido"),
		companyName: schemas.companyName,
		password: schemas.password.required("Contraseña es un campo requerido"),
	})
	.required();

type Values = yup.InferType<typeof schema>;

const initialValues: Values = {
	email: "",
	companyName: "",
	password: "",
};

const onSubmit = (history: History, role: "worker" | "company") => (
	values: Values,
	actions: FormikHelpers<Values>
) => {
	const options = {
		email: values.email,
		password: values.password,
		role,
	};

	register(options)
		.then(x => {
			actions.resetForm({ values: initialValues });
			// checks to see if the current page is the write a review page.
			// if the current page is write a review page and a register is successful
			// there should be no redirect so that the user can stay on the write a review page

			analytics.sendEvent({
				category: "User",
				action: "Created Account",
				label: options.role,
			});

			if (
				!(
					window.location.pathname.includes("/write-review") ||
					window.location.pathname.includes("/submit-salary-data") ||
					window.location.pathname.includes("/apply-for-job") ||
					window.location.pathname.includes("/recurso")
				)
			) {
				history.push("/");
			}
		})
		.catch(error => {
			// Errors to display on form fields
			const formErrors: FormikErrors<Values> = {};

			if (error.error.errors.includes("email is taken")) {
				formErrors.email = "La dirección de correo ya existe";
			}

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});
};

export function RegisterForm(): JSX.Element {
	const history = useHistory();

	const params = new URLSearchParams(location.search);
	let userRole: string | null = "worker";

	if (params != null) {
		userRole = params.get("user");

		// userRole will be null if the register-login modal is being used
		if (userRole === null) {
			userRole = "worker";
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(history, userRole)}
		>
			<InnerForm userRole={userRole} />
		</Formik>
	);
}
