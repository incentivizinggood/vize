import React from "react";
import { Formik, FormikHelpers, FormikErrors } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";
import * as urlGenerators from "src/pages/url-generators";
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

const onSubmit = (history: History, role: "worker" | "company", setSubmissionError: any) => (
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
					window.location.pathname.includes(urlGenerators.queryRoutes.writeReview) ||
					window.location.pathname.includes(urlGenerators.queryRoutes.submitSalaryData) ||
					window.location.pathname.includes(urlGenerators.queryRoutes.applyForJob) ||
					window.location.pathname.includes(urlGenerators.queryRoutes.resources)
				)
			) {
				history.push("/");
			}
		})
		.catch(error => {
			// Error to display at bottom of form
			setSubmissionError(error.message);

			actions.setSubmitting(false);
		});
};

export function RegisterForm(): JSX.Element {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);

	const params = new URLSearchParams(location.search);
	let userRole: string | null = "worker";

	if (params != null) {
		userRole = params.get(urlGenerators.queryParameters.user);

		// userRole will be null if the register-login modal is being used
		if (userRole === null) {
			userRole = "worker";
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(history, userRole, setSubmissionError)}
		>
			<InnerForm userRole={userRole} submissionError={submissionError} />
		</Formik>
	);
}
