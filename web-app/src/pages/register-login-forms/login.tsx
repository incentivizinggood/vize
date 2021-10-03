import React from "react";

import * as urlGenerators from "src/pages/url-generators";
import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import LoginForm from "./login-form";

const T = translations.loginRegister;

/** The page where users can login to the app. */
function LoginPage(): JSX.Element {
	let userRole = "worker";
	const params = new URLSearchParams(location.search);

	if (params != null) {
		userRole = params.get(urlGenerators.queryParameters.user);
	}

	return (
		<FormPageWrapper title="Iniciar Sesión">
			<FormHeader>
				<T.login />
			</FormHeader>
			<LoginForm userRole={userRole} />
		</FormPageWrapper>
	);
}

export default LoginPage;
