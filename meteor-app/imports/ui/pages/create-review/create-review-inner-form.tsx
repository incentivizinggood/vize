import React from "react";
import { Form } from "formik";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import { Button } from "imports/ui/components/button";
import {
	Field,
	FormToolbar,
	SubmissionError,
} from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

const T = translations.createReview;

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
				name="reviewTitle"
				type="text"
				required
				t={T.fields.reviewTitle}
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

			<Field
				name="numberOfMonthsWorked"
				type="number"
				required
				t={T.fields.numberOfMonthsWorked}
			/>

			<Field name="pros" required multiline rows={6} t={T.fields.pros} />

			<Field name="cons" required multiline rows={6} t={T.fields.cons} />

			<T.fields.wouldRecommendToOtherJobSeekers
				renderer={t => (
					<Field
						name="wouldRecommendToOtherJobSeekers"
						select
						required
						label={t.label}
					>
						<option value="">(Select One)</option>
						<option value="true">{t.yes}</option>
						<option value="false">{t.no}</option>
					</Field>
				)}
			/>

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

			<Field
				name="additionalComments"
				multiline
				rows={6}
				t={T.fields.additionalComments}
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

export default withUpdateOnChangeLocale(InnerForm);