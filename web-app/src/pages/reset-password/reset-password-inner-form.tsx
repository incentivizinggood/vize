import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

const ResetPasswordButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

export default function InnerForm({
	submissionError,
}: {
	submissionError: string | null;
}): JSX.Element {
	return (
		<Form noValidate>
			<Field name="newPassword" type="password" required t={T.password} />

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<ResetPasswordButton $primary type="submit">
					{/* TODO translate */}
					Reset Password
				</ResetPasswordButton>
			</FormToolbar>
		</Form>
	);
}
