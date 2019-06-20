import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "/imports/ui/components/form-layout.jsx";

import LoginForm from "./login-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<FormPageWrapper title="Login">
			<FormHeader>
				<T>login</T>
			</FormHeader>
			<LoginForm />
			<FormFooter>
				<T>noAccount</T>
				<Link to="/register">
					<T>register</T>
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}

export default LoginPage;
