import React from "react";
import { Formik, FormikHelpers, FormikErrors } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";
import * as urlGenerators from "src/pages/url-generators";
import * as analytics from "src/startup/analytics";
import * as schemas from "src/form-schemas";
import { register } from "src/auth";
import { FormFooter } from "src/components/form-stuff";

import LoginWithFacebook from "./components/login-with-facebook";
import { Link } from "react-router-dom";
import { translations } from "src/translations";
import styled from "styled-components";

const FunctionButton = styled.button`
	color: #337ab7;

	:hover {
		color: #23527c;
	}
`;

const T = translations.loginRegister;

import { InnerForm } from "./register-inner-form";

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email("El correo electrónico debe ser válido")
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

const onSubmit =
	(history: History, role: "worker" | "company", setSubmissionError: any) =>
	(values: Values, actions: FormikHelpers<Values>) => {
		const options = {
			email: values.email,
			password: values.password,
			role,
		};

		register(options)
			.then((x) => {
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
						window.location.pathname.includes(
							urlGenerators.queryRoutes.writeReview
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.submitSalaryData
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.applyForJob
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.workerResources
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.userProfileForm
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.jobs
						) ||
						window.location.pathname.includes(
							urlGenerators.queryRoutes.postJob
						)
					)
				) {
					history.push("/");
				}
			})
			.catch((error) => {
				// Error to display at bottom of form
				setSubmissionError(error.message);

				actions.setSubmitting(false);
			});
	};

interface RegisterFormProps {
	setRegisterOrLogin?: any;
	userRole: string;
}
export function RegisterForm({
	setRegisterOrLogin,
	userRole,
}: RegisterFormProps): JSX.Element {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit(history, userRole, setSubmissionError)}
			>
				<InnerForm
					userRole={userRole}
					submissionError={submissionError}
				/>
			</Formik>

			{userRole === "worker" && <LoginWithFacebook />}
			<FormFooter>
				<T.alreadyAccount />
				{setRegisterOrLogin ? (
					<FunctionButton
						onClick={() => {
							setRegisterOrLogin("login");
						}}
					>
						<T.login />
					</FunctionButton>
				) : (
					<Link to={urlGenerators.vizeLogin(userRole)}>
						<T.login />
					</Link>
				)}
			</FormFooter>
		</>
	);
}
