import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";

import { requestPasswordReset } from "src/auth";

import InnerForm from "./request-password-reset-inner-form";

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email("El correo electrónico debe ser válido")
			.required("Correo Electrónico es un campo requerido"),
	})
	.required();

type Values = yup.InferType<typeof schema>;

const initialValues: Values = {
	email: "",
};

const onSubmit =
	(history: History, setSubmissionError: any) =>
	async (values: Values, actions: FormikHelpers<Values>) => {
		try {
			await requestPasswordReset({
				emailAddress: values.email,
			});

			actions.resetForm({ values: initialValues });

			// TODO Make a better UI for successful submission.
			// English Translation: "We have emailed you a link to reset your password"
			alert(
				"Te hemos enviado un enlace por correo electrónico para restablecer tu contraseña."
			);
			history.push("/");
		} catch (error) {
			// Error to display at bottom of form
			setSubmissionError(error.message);

			actions.setSubmitting(false);
		}
	};

export default function RequestPasswordResetForm(): JSX.Element {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(history, setSubmissionError)}
		>
			<InnerForm submissionError={submissionError} />
		</Formik>
	);
}
