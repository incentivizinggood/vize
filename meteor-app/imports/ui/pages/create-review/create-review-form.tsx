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
		address: " ",
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
	incomeType: "",
	incomeAmount: "",
	gender: "",
};

const proConSchema = yup
	.string()
	.test("five-word-min", "Se requiere al menos cinco palabras", value => {
		const isString =
			value && (typeof value === "string" || value instanceof String);
		const wordCount = isString ? value.split(/\s+\b/).length : 0;
		return wordCount >= 5;
	})
	.required("Se requieren las ventajas/limitaciones");

const starRatingSchema = yup
	.number()
	.integer()
	.min(0)
	.max(5)
	.required("Se requiere esta calificación");

const schema = yup.object().shape({
	companyName: schemas.companyName.required(
		"Se requiere el nombre de la empresa"
	),
	reviewTitle: yup
		.string()
		.required("Se requiere el titulo de la evaluación"),
	location: yup
		.object()
		.shape({
			city: yup
				.string()
				.max(300)
				.required("Se requiere el nombre de la ciudad"),
			address: yup
				.string()
				.max(300)
				.required("Se requiere la dirección"),
			industrialHub: yup.string().max(300),
		})
		.required(),
	jobTitle: yup.string().required("Se requiere el titulo de trabajo"),
	numberOfMonthsWorked: yup
		.number()
		.min(0)
		.required("Se requiere el numero de meses trabajados"),
	pros: proConSchema,
	cons: proConSchema,
	wouldRecommendToOtherJobSeekers: yup
		.boolean()
		.required("Se requiere la recomendación"),
	healthAndSafety: starRatingSchema,
	managerRelationship: starRatingSchema,
	workEnvironment: starRatingSchema,
	benefits: starRatingSchema,
	overallSatisfaction: starRatingSchema,
	additionalComments: yup.string(),
	incomeType: yup
		.string()
		.oneOf([
			"YEARLY_SALARY",
			"MONTHLY_SALARY",
			"WEEKLY_SALARY",
			"DAILY_SALARY",
			"HOURLY_WAGE",
		])
		.required("Se requiere el tipo de ingreso"),
	incomeAmount: yup
		.number()
		.min(0)
		.required("Se requiere la cantidad de ingresos"),
});

// TODO: Check if user has already added a salary so that there is no error in submitting a review
function CreateReviewForm({ history, companyName, user }) {
	const [submissionError, setSubmissionError] = React.useState(null);
	let [content, setContent] = React.useState(null);

	const onSubmit = (createReview, history, setSubmissionError) => (
		values,
		actions
	) => {
		const reviewValues = {
			companyName: values.companyName,
			reviewTitle: values.reviewTitle,
			location: {
				city: values.location.city,
				address: values.location.address,
				industrialHub: values.location.industrialHub,
			},
			jobTitle: values.jobTitle,
			numberOfMonthsWorked: values.numberOfMonthsWorked,
			pros: values.pros,
			cons: values.cons,
			wouldRecommendToOtherJobSeekers:
				values.wouldRecommendToOtherJobSeekers,
			healthAndSafety: values.healthAndSafety,
			managerRelationship: values.managerRelationship,
			workEnvironment: values.workEnvironment,
			benefits: values.benefits,
			overallSatisfaction: values.overallSatisfaction,
			additionalComments: values.additionalComments,
		};

		const salaryValues = {
			companyName: values.companyName,
			jobTitle: values.jobTitle,
			incomeAmount: values.incomeAmount,
			incomeType: values.incomeType,
			location: {
				city: values.location.city,
				address: values.location.address,
				industrialHub: values.location.industrialHub,
			},
			gender: values.location.gender,
		};

		createReview({
			variables: {
				reviewInput: omitEmptyStrings(reviewValues),
				salaryInput: omitEmptyStrings(salaryValues),
			},
		})
			.then(({ data }) => {
				actions.resetForm(initialValues);

				// Go to the review submitted page so that the user can claim their reward.
				history.push("/review-submitted");
			})
			.catch(errors => {
				console.error(errors.message);
				if (errors.message === "GraphQL error: NOT_LOGGED_IN") {
					setContent(
						<PopupModal isOpen={true}>
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
