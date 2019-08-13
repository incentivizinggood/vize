import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { Mutation } from "react-apollo";
import { mapValues, map, omitBy, filter, merge } from "lodash";

import * as schemas from "imports/ui/form-schemas";

import InnerForm from "./create-review-inner-form";
import createReviewQuery from "./create-review.graphql";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	companyName: "",
	reviewTitle: "",
	location: {
		city: "",
		address: "",
		industrialHub: "",
	},
	jobTitle: "",
	numberOfMonthsWorked: "",
	pros: "",
	cons: "",
	wouldRecommendToOtherJobSeekers: "",
	healthAndSafety: "",
	managerRelationship: "",
	workEnvironment: "",
	benefits: "",
	overallSatisfaction: "",
	additionalComments: "",
};

const starRatingSchema = yup
	.number()
	.integer()
	.min(0)
	.max(5)
	.required();

const schema = yup.object().shape({
	companyName: schemas.companyName.required(),
	reviewTitle: yup.string().required(),
	location: yup
		.object()
		.shape({
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
		.required(),
	jobTitle: yup.string().required(),
	numberOfMonthsWorked: yup
		.number()
		.min(0)
		.required(),
	pros: yup.string().required(),
	cons: yup.string().required(),
	wouldRecommendToOtherJobSeekers: yup.boolean().required(),
	healthAndSafety: starRatingSchema,
	managerRelationship: starRatingSchema,
	workEnvironment: starRatingSchema,
	benefits: starRatingSchema,
	overallSatisfaction: starRatingSchema,
	additionalComments: yup.string(),
});

const onSubmit = (createReview, history, setSubmissionError) => (
	values,
	actions
) =>
	createReview({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			console.log("data", data);

			actions.resetForm(initialValues);

			// Go to the review submitted page so that the user can claim their reward.
			history.push("/review-submitted");
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

const CreateReviewForm = ({ history, companyName }) => {
	const [submissionError, setSubmissionError] = React.useState(null);
	return (
		<Mutation mutation={createReviewQuery}>
			{createReview => (
				<Formik
					initialValues={merge(initialValues, {
						companyName,
					})}
					validationSchema={schema}
					onSubmit={onSubmit(
						createReview,
						history,
						setSubmissionError
					)}
				>
					<InnerForm submissionError={submissionError} />
				</Formik>
			)}
		</Mutation>
	);
};

export default withRouter(CreateReviewForm);
