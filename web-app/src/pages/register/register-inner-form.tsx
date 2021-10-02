import React from "react";
import { Form } from "formik";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { LoginRegisterButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

interface InnerFormProps {
	userRole: string;
	submissionError: string | null;
}

export function InnerForm(props: InnerFormProps): JSX.Element {
	const companyNameField =
		props.userRole === "company" ? (
			<Field name="companyName" type="text" t={T.companyName} />
		) : null;

	return (
		<Form noValidate>
			<Field name="email" type="email" required t={T.email} />

			{companyNameField}

			<Field name="password" type="password" required t={T.password} />

			<SubmissionError error={props.submissionError} />

			<FormToolbar>
				<LoginRegisterButton $primary type="submit">
					<T.createAccount />
				</LoginRegisterButton>
			</FormToolbar>
		</Form>
	);
}
