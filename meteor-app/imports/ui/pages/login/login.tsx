import React from "react";
import { Link } from "react-router-dom";
import { urlGenerators } from "imports/ui/pages/url-generators";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import LoginForm from "./login-form";

const T = translations.loginRegister;

/* The page where users can login to the app.
 */

function LoginPage() {
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
			<a href="/auth/facebook">Login with Facebook</a>
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
