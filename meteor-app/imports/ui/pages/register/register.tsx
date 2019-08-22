import React from "react";
import { Link } from "react-router-dom";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import RegisterForm from "./register-form";

const T = translations.loginRegister;

/* The page where users can create an account.
 */
function RegisterPage() {
	return (
		<FormPageWrapper title="Register">
			<FormHeader>
				<T.register />
			</FormHeader>
			<RegisterForm />
			<FormFooter>
				<T.alreadyAccount />
				<Link
					to={{
						pathname: "/login",
						state: {
							prevPath: location.pathname,
						},
					}}
				>
					<T.login />
				</Link>
			</FormFooter>
		</FormPageWrapper>
	);
}
export default RegisterPage;
