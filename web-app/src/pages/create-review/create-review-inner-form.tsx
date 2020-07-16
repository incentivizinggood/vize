import React from "react";
import { Form } from "formik";
import { SubmitButton } from "src/components/button";
import styled from "styled-components";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import {
	Field,
	FormToolbar,
	SubmissionError,
	FormText,
} from "src/components/form-stuff";
import { translations, useTranslations } from "src/translations";

const T = translations.createReview;

const FormDividerLine = styled.hr`
	border-top: 1px solid black;
	margin-left: -30px;
	margin-right: -30px;
`;

function InnerForm({ submissionError }) {
	const t = useTranslations().createReview;

	return (
		<Form noValidate>
			<Field
				name="companyName"
				type="text"
				required
				t={T.fields.companyName}
			/>

			<Field
				name="reviewTitle"
				type="text"
				required
				t={T.fields.reviewTitle}
			/>

			<Field
				name="location.city"
				type="text"
				variant="privacyTextField"
				required
				t={T.fields.location.city}
			/>

			<Field
				name="location.industrialHub"
				type="text"
				variant="privacyTextField"
				t={T.fields.location.industrialHub}
			/>

			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

			<Field
				name="numberOfMonthsWorked"
				type="number"
				variant="privacyTextField"
				required
				t={T.fields.numberOfMonthsWorked}
			/>

			<Field
				name="contractType"
				select
				variant="privacyTextField"
				required
				label={t.fields.contractType.label}
			>
				<option value="">(Seleccione una Opción)</option>
				<option value="FULL_TIME">
					{t.fields.contractType.fullTime}
				</option>
				<option value="TEMPORARY">
					{t.fields.contractType.temporary}
				</option>
				<option value="PART_TIME">
					{t.fields.contractType.partTime}
				</option>
				<option value="INTERNSHIP">
					{t.fields.contractType.internship}
				</option>
				<option value="CONTRACTOR">
					{t.fields.contractType.contractor}
				</option>
			</Field>

			<br />
			<br />

			<Field
				name="employmentStatus"
				type="radioButtons"
				label={t.fields.employmentStatus.label}
				options={[
					<FormControlLabel
						value="FORMER"
						control={<Radio />}
						label={t.fields.employmentStatus.former}
					/>,
					<FormControlLabel
						value="CURRENT"
						control={<Radio />}
						label={t.fields.employmentStatus.current}
					/>,
				]}
			/>

			<Field name="pros" required multiline rows={6} t={T.fields.pros} />

			<Field name="cons" required multiline rows={6} t={T.fields.cons} />

			<Field
				name="wouldRecommendToOtherJobSeekers"
				select
				required
				label={t.fields.wouldRecommendToOtherJobSeekers.label}
			>
				<option value="">(Seleccione una Opción)</option>
				<option value="true">
					{t.fields.wouldRecommendToOtherJobSeekers.yes}
				</option>
				<option value="false">
					{t.fields.wouldRecommendToOtherJobSeekers.no}
				</option>
			</Field>
			<br />
			<br />

			<Field
				name="healthAndSafety"
				type="rating"
				required
				t={T.fields.healthAndSafety}
			/>

			<Field
				name="managerRelationship"
				type="rating"
				required
				t={T.fields.managerRelationship}
			/>

			<Field
				name="workEnvironment"
				type="rating"
				required
				t={T.fields.workEnvironment}
			/>

			<Field
				name="benefits"
				type="rating"
				required
				t={T.fields.benefits}
			/>

			<Field
				name="overallSatisfaction"
				type="rating"
				required
				t={T.fields.overallSatisfaction}
			/>

			<br />

			<Field
				name="additionalComments"
				multiline
				rows={6}
				t={T.fields.additionalComments}
			/>

			<FormDividerLine />
			<FormText>{t.formSalaryNotice}</FormText>

			<Field
				name="incomeType"
				select
				variant="privacyTextField"
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
				variant="privacyTextField"
				required
				t={T.fields.incomeAmount}
			/>

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
