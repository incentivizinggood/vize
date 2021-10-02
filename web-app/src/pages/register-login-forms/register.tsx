import React from "react";
import { Link } from "react-router-dom";
import * as urlGenerators from "src/pages/url-generators";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";
import LoginWithFacebook from "./components/login-with-facebook";

import { RegisterForm } from "./register-form";

const T = translations.loginRegister;

/* The page where users can create an account.
 */
function RegisterPage(): JSX.Element {
	let userRole = "worker";
	const params = new URLSearchParams(location.search);

	if (params != null) {
		userRole = params.get(urlGenerators.queryParameters.user);
	}

	return (
		<FormPageWrapper title="Register">
			<FormHeader>
				<T.register />
			</FormHeader>
			<RegisterForm />
			<LoginWithFacebook />
			<FormFooter>
				<T.alreadyAccount />
				<Link to={urlGenerators.vizeLogin(userRole)}>
					<T.login />
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}
export default RegisterPage;
