import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter } from "lodash";

import { useCreateJobAdMutation } from "generated/graphql-operations";
import { urlGenerators } from "src/pages/url-generators";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

import InnerForm from "./create-job-ad-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	jobTitle: "",
	locations: [
		{
			city: "",
			address: "",
			industrialHub: "",
		},
	],
	salaryMin: "",
	salaryMax: "",
	salaryType: "",
	contractType: "",
	jobDescription: "",
	responsibilities: "",
	qualifications: "",
};

const schema = yup.object().shape({
	jobTitle: yup.string().required(),
	locations: yup
		.array()
		.of(
			yup.object().shape({
				city: yup
					.string()
					.max(300)
					.required(),
				address: yup
					.string()
					.max(300)
					.required(),
				industrialHub: yup.string().max(300),
			})
		)
		.required(),
	salaryMin: yup.number().required(),
	salaryMax: yup.number().required(),
	salaryType: yup
		.string()
		.oneOf([
			"YEARLY_SALARY",
			"MONTHLY_SALARY",
			"WEEKLY_SALARY",
			"DAILY_SALARY",
			"HOURLY_WAGE",
		])
		.required(),
	contractType: yup
		.mixed()
		.oneOf([
			"FULL_TIME",
			"PART_TIME",
			"INTERNSHIP",
			"TEMPORARY",
			"CONTRACTOR",
		])
		.required(),
	jobDescription: yup.string().required(),
	responsibilities: yup.string().required(),
	qualifications: yup.string().required(),
});

const onSubmit = (createJobAd, history, setSubmissionError) => (
	values,
	actions
) =>
	createJobAd({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			console.log("data", data);

			actions.resetForm(initialValues);

			// Track successful job posted event
			ReactGA.event({
				category: "Company",
				action: "Job Posted",
			});
			ReactPixel.track("Job Posted", { category: "Company" });

			// Go to the newly created jobAd's page.
			history.push(
				urlGenerators.vizeProfileUrl(data.createJobAd.jobAd.id)
			);
		})
		.catch(errors => {
			console.error(errors);
			console.log(mapValues(errors, x => x));

			setSubmissionError(errors);

			// Errors to display on form fields
			const formErrors = {};

			/*
			if (error.reason === "User not found") {
				formErrors.username = "User not found";
			}
			if (error.reason === "Incorrect password") {
				// TODO: clear the password input on this error
				formErrors.password = "Incorrect password";
			}
			*/

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});

export default function CreateJobAdForm() {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	const [createJobAd] = useCreateJobAdMutation();

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(createJobAd, history, setSubmissionError)}
		>
			<InnerForm submissionError={submissionError} />
		</Formik>
	);
}
