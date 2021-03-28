import React from "react";
import { Form } from "formik";

import { Button } from "src/components/button";
import {
	Field,
	FormToolbar,
	SubmissionError,
	FormArray,
} from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.userProfileForm;

function InnerForm({ submissionError }) {
	return (
		<Form noValidate>
			<Field name="fullName" type="text" required t={T.fields.fullName} />

			<Field
				name="phoneNumber"
				type="text"
				required
				t={T.fields.phoneNumber}
			/>

			<Field
				name="fiveYearGoal"
				type="text"
				required
				t={T.fields.fiveYearGoal}
			/>

			<FormArray
				name="workExperience"
				ElementRender={({ name }) => (
					<>
						<Field
							name={`${name}.jobTitle`}
							type="text"
							required
							t={T.fields.workExperiences.jobTitle}
						/>
						<Field
							name={`${name}.companyName`}
							type="text"
							required
							t={T.fields.workExperiences.companyName}
						/>
						<Field
							name={`${name}.city`}
							type="text"
							required
							t={T.fields.workExperiences.city}
						/>
						<Field
							name={`${name}.startDate`}
							type="text"
							t={T.fields.workExperiences.startDate}
						/>
						<Field
							name={`${name}.endDate`}
							type="text"
							t={T.fields.workExperiences.startDate}
						/>
						<Field
							name={`${name}.experienceDescription`}
							multiline
							rows={6}
							required
							t={T.fields.workExperiences.experienceDescription}
						/>
					</>
				)}
				T={T.fields.workExperiences}
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
