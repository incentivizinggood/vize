import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";

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
	);
};

export default withRouter(CreateReviewForm);
