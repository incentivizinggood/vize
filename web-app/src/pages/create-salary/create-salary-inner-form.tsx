import React from "react";
import { Button } from "src/components/button";

import { Field } from "src/components/form-stuff";
import { CompanyNameInput } from "src/components/company-name-input";
import { translations, useTranslations } from "src/translations";
import FormWrapper from "../forms/form-wrapper";

const T = translations.createSalary;

interface CreateSalaryInnerFormProps {
	schema: any;
	submissionError: any;
	setSubmissionError: any;
}

function InnerForm(props: CreateSalaryInnerFormProps): any {
	const t = useTranslations().createSalary;

	return (
		<FormWrapper submitButtonText={T.submit} {...props}>
			<CompanyNameInput
				name="companyName"
				required
				{...t.fields.companyName}
			/>

			<Field
				name="location.city"
				type="text"
				required
				t={T.fields.location.city}
			/>

			<Field
				name="location.industrialHub"
				type="text"
				t={T.fields.location.industrialHub}
			/>

			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

			<T.fields.incomeType
				renderer={(t) => (
					<Field name="incomeType" select required label={t.label}>
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

			<Field
				name="incomeAmount"
				type="number"
				required
				t={T.fields.incomeAmount}
			/>

			<T.fields.gender
				renderer={(t) => (
					<Field name="gender" select label={t.label}>
						<option value="MALE">{t.male}</option>
						<option value="FEMALE">{t.female}</option>
					</Field>
				)}
			/>
		</FormWrapper>
	);
}

export default InnerForm;
