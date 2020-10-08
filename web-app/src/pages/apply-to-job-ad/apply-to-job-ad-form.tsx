import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as analytics from "src/startup/analytics";

import { useApplyToJobAdMutation } from "generated/graphql-operations";

import InnerForm from "./apply-to-job-ad-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	jobAdId: "",
	fullName: "",
	email: "",
	phoneNumber: "",
	coverLetter: "",
};

const schema = yup.object().shape({
	jobAdId: yup.string().required(),
	fullName: yup.string().required(),
	email: yup
		.string()
		.email()
		.required(),
	phoneNumber: yup.string().required(),
	coverLetter: yup.string(),
});

const onSubmit = (applyToJobAd, history, setSubmissionError) => (
	values,
	actions
) =>
	applyToJobAd({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			console.log("bals", values);

			actions.resetForm(initialValues);

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: values.jobAdId,
			});

			history.push("/");
		})
		.catch(errors => {
			console.error(errors);
			console.log(mapValues(errors, x => x));

			setSubmissionError(errors);

			// Errors to display on form fields
			const formErrors = {};

			// TODO: better error displaying.

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});

export interface ApplyToJobAdFormProps {
	jobAdId: string;
}

export default function ApplyToJobAdForm({ jobAdId }: ApplyToJobAdFormProps) {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	const [applyToJobAd] = useApplyToJobAdMutation();

	return (
		<Formik
			initialValues={merge(initialValues, {
				jobAdId,
			})}
			validationSchema={schema}
			onSubmit={onSubmit(applyToJobAd, history, setSubmissionError)}
		>
			<InnerForm submissionError={submissionError} />
		</Formik>
	);
}
