import React from "react";
import { Form } from "formik";

import { Button } from "src/components/button";
import {
	FormArray,
	Field,
	FormToolbar,
	SubmissionError,
} from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.createJobAd;

function InnerForm({ submissionError }) {
	return (
		<Form noValidate>
			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

			<FormArray
				name="locations"
				ElementRender={({ name }) => (
					<>
						<Field
							name={`${name}.city`}
							type="text"
							required
							t={T.fields.locations.city}
						/>
						<Field
							name={`${name}.address`}
							type="text"
							required
							t={T.fields.locations.address}
						/>
						<Field
							name={`${name}.industrialHub`}
							type="text"
							t={T.fields.locations.industrialHub}
						/>
					</>
				)}
				T={T.fields.locations}
			/>

			<Field
				name="salaryMin"
				type="number"
				required
				t={T.fields.salaryMin}
			/>

			<Field
				name="salaryMax"
				type="number"
				required
				t={T.fields.salaryMax}
			/>

			<T.fields.salaryType
				renderer={t => (
					<Field name="salaryType" select required label={t.label}>
						<option value="YEARLY_SALARY">{t.yearlySalary}</option>
						<option value="MONTHLY_SALARY">
							{t.monthlySalary}
						</option>
						<option value="WEEKLY_SALARY">{t.weeklySalary}</option>
						<option value="DAILY_SALARY">{t.dailySalary}</option>
						<option value="HOURLY_WAGE">{t.hourlyWage}</option>
					</Field>
				)}
			/>

			<T.fields.contractType
				renderer={t => (
					<Field name="contractType" select required label={t.label}>
						<option value="FULL_TIME">{t.fullTime}</option>
						<option value="TEMPORARY">{t.temporary}</option>
						<option value="PART_TIME">{t.partTime}</option>
						<option value="INTERNSHIP">{t.internship}</option>
						<option value="CONTRACTOR">{t.contractor}</option>
					</Field>
				)}
			/>

			<Field
				name="jobDescription"
				multiline
				rows={6}
				required
				t={T.fields.jobDescription}
			/>

			<Field
				name="responsibilities"
				multiline
				rows={6}
				required
				t={T.fields.responsibilities}
			/>

			<Field
				name="qualifications"
				multiline
				rows={6}
				required
				t={T.fields.qualifications}
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
