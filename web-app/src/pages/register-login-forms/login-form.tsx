import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { History } from "history";
import * as yup from "yup";
import * as urlGenerators from "src/pages/url-generators";
import * as schemas from "src/form-schemas";
import { login } from "src/auth";
import LoginWithFacebook from "./components/login-with-facebook";
import { Link } from "react-router-dom";
import { FormFooter } from "src/components/form-stuff";

import InnerForm from "./login-inner-form";

import styled from "styled-components";
import { translations } from "src/translations";

const T = translations.loginRegister;

const ForgotPasswordDiv = styled.div`
	margin-top: 5px;
	text-align: center;
`;

const FunctionButton = styled.button`
	color: #337ab7;

	:hover {
		color: #23527c;
	}
`;

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

const onSubmit =
	(history: History, setSubmissionError: any) =>
	async (values: Values, actions: FormikHelpers<Values>) => {
		try {
			await login(values.loginId, values.password);

			actions.resetForm({ values: initialValues });

			// TODO: use query params so that login redirects user back to where they were when they login
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
					)
				)
			) {
				history.push("/");
			}
		} catch (error) {
			// Error to display at bottom of form
			setSubmissionError(error.message);

			actions.setSubmitting(false);
		}
	};

interface LoginFormProps {
	userRole?: any;
	setRegisterOrLogin?: any;
}

export default function LoginForm({
	userRole,
	setRegisterOrLogin,
}: LoginFormProps): JSX.Element {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit(history, setSubmissionError)}
			>
				<InnerForm submissionError={submissionError} />
			</Formik>
			<ForgotPasswordDiv>
				{/* TODO Make this look nice. */}
				<Link to={urlGenerators.vizeRequestPasswordReset()}>
					<T.forgotPassword />
				</Link>
			</ForgotPasswordDiv>
			<LoginWithFacebook />

			<FormFooter>
				<T.noAccount />
				{setRegisterOrLogin ? (
					<FunctionButton
						onClick={() => {
							setRegisterOrLogin("register");
						}}
					>
						<T.register />
					</FunctionButton>
				) : (
					<Link to={urlGenerators.vizeLogin(userRole)}>
						<T.register />
					</Link>
				)}
			</FormFooter>
		</>
	);
}
