import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.requestPasswordReset;

const RequestPasswordResetButton = styled(Button)`
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
			<Field name="email" type="email" required t={T.email} />

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<RequestPasswordResetButton $primary type="submit">
					<T.submitRequest />
				</RequestPasswordResetButton>
			</FormToolbar>
		</Form>
	);
}
