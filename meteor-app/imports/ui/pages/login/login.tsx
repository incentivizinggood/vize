import React from "react";
import { Link } from "react-router-dom";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "imports/ui/components/form-layout";
import { translations } from "imports/ui/translations";

import LoginForm from "./login-form";

const T = translations.loginRegister;

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<FormPageWrapper title="Login">
			<FormHeader>
				<T.login />
			</FormHeader>
			<LoginForm />
			<FormFooter>
				<T.noAccount />
				<Link to="/register">
					<T.register />
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}

export default LoginPage;
