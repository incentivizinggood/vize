import React from "react";
import * as urlGenerators from "src/pages/url-generators";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import { RegisterForm } from "./register-form";

const T = translations.loginRegister;

/* The page where users can create an account.
 */
function RegisterPage(): JSX.Element {
	let userRole = "worker";
	const params = new URLSearchParams(location.search);

	if (params != null) {
		const queryParams = params.get(urlGenerators.queryParameters.user);

		if (queryParams != null) {
			userRole = queryParams;
		}
	}

	return (
		<FormPageWrapper title="Crear Cuenta">
			<FormHeader>
				<T.register />
			</FormHeader>
			<RegisterForm userRole={userRole} />
		</FormPageWrapper>
	);
}
export default RegisterPage;
