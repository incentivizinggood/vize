import React from "react";
import { Form } from "formik";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { LoginRegisterButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

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
				<LoginRegisterButton $primary type="submit">
					<T.login />
				</LoginRegisterButton>
			</FormToolbar>
		</Form>
	);
}
