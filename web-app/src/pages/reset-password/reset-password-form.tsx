import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";

import { resetPassword } from "src/auth";
import * as schemas from "src/form-schemas";
import * as urlGenerators from "src/pages/url-generators";

import InnerForm from "./reset-password-inner-form";

const schema = yup
	.object()
	.shape({
		newPassword: schemas.password.required(
			"Contraseña es un campo requerido"
		),
		confirmNewPassword: schemas.password
			.required("Contraseña es un campo requerido")
			.test(
				"passwords-match",
				"Las contraseñas no coinciden",
				function (value) {
					return (
						!this.parent.newPassword ||
						value === this.parent.newPassword
					);
				}
			),
	})
	.required();

type Values = yup.InferType<typeof schema>;

const initialValues: Values = {
	newPassword: "",
	confirmNewPassword: "",
};

const onSubmit =
	(history: History, setSubmissionError: any) =>
	async (values: Values, actions: FormikHelpers<Values>) => {
		try {
			const params = new URLSearchParams(location.search);

			await resetPassword({
				passwordResetRequestId: params.get("id") || "",
				newPassword: values.newPassword,
			});

			actions.resetForm({ values: initialValues });

			// TODO Make a better UI for successful submission.
			alert("Your password has been reset.");
			history.push(urlGenerators.vizeLogin());
		} catch (error) {
			// Error to display at bottom of form
			setSubmissionError(error.message);

			actions.setSubmitting(false);
		}
	};

export default function ResetPasswordForm(): JSX.Element {
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
