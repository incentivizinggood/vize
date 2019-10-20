import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import PopupModal from "imports/ui/components/popup-modal";
import RegisterLoginModal from "imports/ui/components/register-login-modal";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { CreateReviewComponent as MutationCreateReview } from "imports/gen/graphql-operations";
import * as schemas from "imports/ui/form-schemas";

import InnerForm from "./create-review-inner-form";

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

const proConSchema = yup
	.string()
	.test("five-word-min", "${path} requires at least 5 words", value => {
		const isString =
			value && (typeof value === "string" || value instanceof String);
		const wordCount = isString ? value.split(/\s+\b/).length : 0;
		return wordCount >= 5;
	})
	.required();

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
	pros: proConSchema,
	cons: proConSchema,
	wouldRecommendToOtherJobSeekers: yup.boolean().required(),
	healthAndSafety: starRatingSchema,
	managerRelationship: starRatingSchema,
	workEnvironment: starRatingSchema,
	benefits: starRatingSchema,
	overallSatisfaction: starRatingSchema,
	additionalComments: yup.string(),
});

function CreateReviewForm({ history, companyName, user }) {
	const [submissionError, setSubmissionError] = React.useState(null);
	let [content, setContent] = React.useState(null);

	const onSubmit = (createReview, history, setSubmissionError) => (
		values,
		actions
	) => {
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
				console.error(errors.message);
				if (errors.message === "GraphQL error: NOT_LOGGED_IN") {
					setContent(
						<PopupModal
							isOpen={true}
							showCloseButton={false}
							canCloseModal={false}
						>
							<RegisterLoginModal />
						</PopupModal>
					);
				} else {
					//if (errors.nessage);
					console.log(mapValues(errors, x => x));

					// cut out the "GraphQL error: " from error message
					const errorMessage = errors.message.substring(14);

					setSubmissionError(errorMessage);

					// Errors to display on form fields
					const formErrors = {};

					// TODO: better error displaying.

					actions.setErrors(formErrors);
				}
				actions.setSubmitting(false);
			});
	};

	if (user) {
		content = null;
	}

	return (
		<div>
			<MutationCreateReview>
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
			</MutationCreateReview>
			{content}
		</div>
	);
}

export default withRouter(
	withTracker(() => ({
		user: Meteor.user(),
	}))(CreateReviewForm)
);
