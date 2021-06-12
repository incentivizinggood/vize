import React from "react";

import {
	FormHeader,
	FormFooter,
	FormPageWrapper,
} from "src/components/form-stuff";

import RequestPasswordResetForm from "./request-password-reset-form";

function RequestPasswordResetPage(): JSX.Element {
	return (
		<FormPageWrapper title="Request Password Reset">
			<FormHeader>
				{/* TODO translate */}
				Request Password Reset
			</FormHeader>
			<RequestPasswordResetForm />
			<FormFooter>Placeholder</FormFooter>
		</FormPageWrapper>
	);
}

export default RequestPasswordResetPage;
