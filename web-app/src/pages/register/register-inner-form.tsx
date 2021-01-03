import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

const RegisterButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

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
				<RegisterButton $primary type="submit">
					<T.createAccount />
				</RegisterButton>
			</FormToolbar>
		</Form>
	);
}
