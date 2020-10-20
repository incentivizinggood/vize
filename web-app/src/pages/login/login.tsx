import React from "react";
import { Link } from "react-router-dom";
import * as urlGenerators from "src/pages/url-generators";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";
import LoginWithFacebook from "src/components/login-with-facebook";

import LoginForm from "./login-form";

const T = translations.loginRegister;

/** The page where users can login to the app. */
function LoginPage(): JSX.Element {
	let userRole = "worker";
	const params = new URLSearchParams(location.search);

	if (params != null) {
		userRole = params.get("user");
	}

	return (
		<FormPageWrapper title="Login">
			<FormHeader>
				<T.login />
			</FormHeader>
			<LoginForm />
			<LoginWithFacebook />
			<FormFooter>
				<T.noAccount />
				<Link to={urlGenerators.vizeRegister(userRole)}>
					<T.register />
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}

export default LoginPage;
