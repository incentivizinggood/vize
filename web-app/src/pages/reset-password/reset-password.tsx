import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";

import ResetPasswordForm from "./reset-password-form";
import { translations } from "src/translations";

const T = translations.resetPassword;

function ResetPasswordPage(): JSX.Element {
	return (
		<FormPageWrapper title="Reset Password">
			<FormHeader>
				<T.resetPassword />
			</FormHeader>
			<ResetPasswordForm />
		</FormPageWrapper>
	);
}

export default ResetPasswordPage;
