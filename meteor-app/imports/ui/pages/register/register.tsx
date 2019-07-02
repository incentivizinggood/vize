import React from "react";
import { Link } from "react-router-dom";

import { i18n } from "meteor/universe:i18n";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "imports/ui/components/form-layout";

import RegisterForm from "./register-form";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
function RegisterPage() {
	return (
		<FormPageWrapper title="Register">
			<FormHeader>
				<T>register</T>
			</FormHeader>
			<RegisterForm />
			<FormFooter>
				<T>alreadyAccount</T>
				<Link to="/login">
					<T>login</T>
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}
export default RegisterPage;
