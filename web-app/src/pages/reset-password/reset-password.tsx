import React from "react";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "src/components/form-stuff";

import ResetPasswordForm from "./reset-password-form";

function ResetPasswordPage(): JSX.Element {
	return (
		<FormPageWrapper title="Reset Password">
			<FormHeader>
				{/* TODO translate */}
				Reset Password
			</FormHeader>
			<ResetPasswordForm />
			<FormFooter>Placeholder</FormFooter>
		</FormPageWrapper>
	);
}

export default ResetPasswordPage;
