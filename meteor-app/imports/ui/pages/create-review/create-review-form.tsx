import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";

import PopupModal from "imports/ui/components/popup-modal";
import RegisterLoginModal from "imports/ui/components/register-login-modal";
import { withUser } from "imports/ui/hoc/user";
import { CreateReviewComponent as MutationCreateReview } from "imports/gen/graphql-operations";
import * as schemas from "imports/ui/form-schemas";
import { RouteComponentProps } from "react-router-dom";
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
	contractType: "",
	employmentStatus: "FORMER",
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
	.test("eight-word-min", "Se requiere al menos ocho palabras", value => {
		const isString =
			value && (typeof value === "string" || value instanceof String);
		const wordCount = isString ? value.split(/\s+\b/).length : 0;
		return wordCount >= 8;
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
	contractType: yup
		.mixed()
		.oneOf([
			"FULL_TIME",
			"PART_TIME",
			"INTERNSHIP",
			"TEMPORARY",
			"CONTRACTOR",
		])
		.required("Se requiere el tipo de contrato"),
	employmentStatus: yup
		.mixed()
		.oneOf(["FORMER", "CURRENT"])
		.required("Se requiere el estado de empleo"),
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

interface CreateReviewFormProps extends RouteComponentProps<any> {
	companyName?: string;
	user?: any;
	referredBy?: string;
}

// TODO: Check if user has already added a salary so that there is no error in submitting a review
// You would just need to write a query to see if the user has written a salary already and if so only call the createReview mutation
function CreateReviewForm({
	history,
	companyName,
	user,
	referredBy,
}: CreateReviewFormProps) {
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
			contractType: values.contractType,
			employmentStatus: values.employmentStatus,
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
			referredBy: referredBy,
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
				console.error("err: ", errors.message);
				if (errors.message.includes("NOT_LOGGED_IN")) {
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

export default withRouter(withUser(CreateReviewForm));
