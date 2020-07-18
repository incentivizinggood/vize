import React from "react";
import { Form } from "formik";

import { Button } from "src/components/button";
import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.applyToJobAd;

function InnerForm({ submissionError }) {
	return (
		<Form noValidate>
			<Field name="fullName" type="text" required t={T.fields.fullName} />

			<Field name="email" type="email" required t={T.fields.email} />

			<Field
				name="phoneNumber"
				type="text"
				required
				t={T.fields.phoneNumber}
			/>

			<Field
				name="coverLetter"
				multiline
				rows={6}
				required
				t={T.fields.coverLetter}
			/>

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button $primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
