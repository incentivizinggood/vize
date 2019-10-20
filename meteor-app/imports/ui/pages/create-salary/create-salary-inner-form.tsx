import React from "react";
import { Form } from "formik";

import { Button } from "imports/ui/components/button";
import {
	Field,
	FormToolbar,
	SubmissionError,
} from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

const T = translations.createSalary;

function InnerForm({ submissionError }) {
	return (
		<Form noValidate>
			<Field
				name="companyName"
				type="text"
				required
				t={T.fields.companyName}
			/>

			<Field
				name="location.city"
				type="text"
				required
				t={T.fields.location.city}
			/>

			<Field
				name="location.address"
				type="text"
				required
				t={T.fields.location.address}
			/>

			<Field
				name="location.industrialHub"
				type="text"
				t={T.fields.location.industrialHub}
			/>

			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

			<T.fields.incomeType
				renderer={t => (
					<Field name="incomeType" select required label={t.label}>
						<option value="YEARLY_SALARY">{t.yearlySalary}</option>
						<option value="MONTHLY_SALARY">
							{t.monthlySalary}
						</option>
						<option value="HOURLY_WAGE">{t.hourlyWage}</option>
					</Field>
				)}
			/>

			<Field
				name="incomeAmount"
				type="number"
				required
				t={T.fields.incomeAmount}
			/>

			<T.fields.gender
				renderer={t => (
					<Field name="gender" select label={t.label}>
						<option value="MALE">{t.male}</option>
						<option value="FEMALE">{t.female}</option>
					</Field>
				)}
			/>

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
