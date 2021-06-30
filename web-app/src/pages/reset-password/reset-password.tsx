import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";

import ResetPasswordForm from "./reset-password-form";

function ResetPasswordPage(): JSX.Element {
	return (
		<FormPageWrapper title="Reset Password">
			<FormHeader>
				{/* TODO translate */}
				Reset Password
			</FormHeader>
			<ResetPasswordForm />
		</FormPageWrapper>
	);
}

export default ResetPasswordPage;
