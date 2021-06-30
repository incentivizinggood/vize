import React from "react";
import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import RequestPasswordResetForm from "./request-password-reset-form";
import { translations } from "src/translations";

const T = translations.requestPasswordReset;

function RequestPasswordResetPage(): JSX.Element {
	return (
		<FormPageWrapper title="Restablecer Contraseña">
			<FormHeader>
				<T.requestPasswordReset />
			</FormHeader>
			<RequestPasswordResetForm />
		</FormPageWrapper>
	);
}

export default RequestPasswordResetPage;
