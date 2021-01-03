import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

const LoginButton = styled(Button)`
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
			<Field name="loginId" type="text" required t={T.loginId} />

			<Field name="password" type="password" required t={T.password} />

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<LoginButton $primary type="submit">
					<T.login />
				</LoginButton>
			</FormToolbar>
		</Form>
	);
}
