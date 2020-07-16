import React from "react";
import { Form } from "formik";
import { SubmitButton } from "src/components/button";

import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";
import { useTranslations } from "src/translations";

function InnerForm({ submissionError }) {
	const t = useTranslations().createSalary;

	return (
		<Form noValidate>
			<Field
				name="companyName"
				type="text"
				required
				{...t.fields.companyName}
			/>

			<Field
				name="location.city"
				type="text"
				required
				{...t.fields.location.city}
			/>

			<Field
				name="location.industrialHub"
				type="text"
				{...t.fields.location.industrialHub}
			/>

			<Field
				name="jobTitle"
				type="text"
				required
				{...t.fields.jobTitle}
			/>

			<Field
				name="incomeType"
				select
				required
				label={t.fields.incomeType.label}
			>
				<option value="YEARLY_SALARY">
					{t.fields.incomeType.yearlySalary}
				</option>
				<option value="MONTHLY_SALARY">
					{t.fields.incomeType.monthlySalary}
				</option>
				<option value="WEEKLY_SALARY">
					{t.fields.incomeType.weeklySalary}
				</option>
				<option value="DAILY_SALARY">
					{t.fields.incomeType.dailySalary}
				</option>
				<option value="HOURLY_WAGE">
					{t.fields.incomeType.hourlyWage}
				</option>
			</Field>

			<Field
				name="incomeAmount"
				type="number"
				required
				{...t.fields.incomeAmount}
			/>

			<Field name="gender" select label={t.fields.gender.label}>
				<option value="MALE">{t.fields.gender.male}</option>
				<option value="FEMALE">{t.fields.gender.female}</option>
			</Field>

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<SubmitButton
					variant="contained"
					size="large"
					type="submit"
					color="primary"
				>
					{t.submit}
				</SubmitButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
