import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as urlGenerators from "src/pages/url-generators";

import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { useUser } from "src/hoc/user";
import { useCreateReviewMutation } from "generated/graphql-operations";
import * as schemas from "src/form-schemas";
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
	.test("610-char-max", "El limite de caracteres es 610", value => {
		const isString =
			value && (typeof value === "string" || value instanceof String);
		const wordCount = isString ? value.length : 0;
		return wordCount <= 610;
	})
	.required("Se requieren las ventajas/limitaciones");

const starRatingSchema = yup
	.number()
	.integer()
	.min(0)
	.max(5)
	.required("Se requiere esta calificación");

const schema = yup
	.object()
	.shape({
		companyName: schemas.companyName.required(
			"Se requiere el nombre de la empresa"
		),
		reviewTitle: yup
			.string()
			.required("Se requiere el titulo de la evaluación"),
		location: schemas.locationSchema,
		jobTitle: yup
			.string()
			.required("Se requiere el nombre de el puesto desempeñado"),
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
	})
	.required();

interface CreateReviewFormProps {
	companyName?: string;
	referredBy?: string;
}

// TODO: Check if user has already added a salary so that there is no error in submitting a review
// You would just need to write a query to see if the user has written a salary already and if so only call the createReview mutation
export default function CreateReviewForm({
	companyName,
	referredBy,
}: CreateReviewFormProps) {
	const user = useUser();
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [content, setContent] = React.useState(null);
	const [createReview] = useCreateReviewMutation();

	const onSubmit = async (values, actions): Promise<void> => {
		/** The values need to be re-validated here because some of the input
		 * components give string values that need to be parsed.
		 */
		const validatedValues = await schema.validate(values);

		const reviewValues = {
			companyName: validatedValues.companyName,
			reviewTitle: validatedValues.reviewTitle,
			location: {
				city: validatedValues.location.city,
				address: validatedValues.location.address,
				industrialHub: validatedValues.location.industrialHub,
			},
			jobTitle: validatedValues.jobTitle,
			numberOfMonthsWorked: validatedValues.numberOfMonthsWorked,
			contractType: validatedValues.contractType,
			employmentStatus: validatedValues.employmentStatus,
			pros: validatedValues.pros,
			cons: validatedValues.cons,
			wouldRecommendToOtherJobSeekers:
				validatedValues.wouldRecommendToOtherJobSeekers,
			healthAndSafety: validatedValues.healthAndSafety,
			managerRelationship: validatedValues.managerRelationship,
			workEnvironment: validatedValues.workEnvironment,
			benefits: validatedValues.benefits,
			overallSatisfaction: validatedValues.overallSatisfaction,
			additionalComments: validatedValues.additionalComments,
			referredBy: referredBy,
		};

		const salaryValues = {
			companyName: validatedValues.companyName,
			jobTitle: validatedValues.jobTitle,
			incomeAmount: validatedValues.incomeAmount,
			incomeType: validatedValues.incomeType,
			location: {
				city: validatedValues.location.city,
				address: validatedValues.location.address,
				industrialHub: validatedValues.location.industrialHub,
			},
		};

		createReview({
			variables: {
				reviewInput: omitEmptyStrings(reviewValues),
				salaryInput: omitEmptyStrings(salaryValues),
			},
		})
			.then(({ data }) => {
				actions.resetForm(initialValues);

				// Track successful review written event
				analytics.sendEvent({
					category: "User",
					action: "Review Submitted",
				});

				// Go to the review submitted page so that the user can claim their reward.
				history.push(`/${urlGenerators.queryRoutes.reviewSubmitted}`);
			})
			.catch(errors => {
				// Error in English: Not Logged In
				if (
					errors.message.includes(
						"Tienes que iniciar una sesión o registrarte"
					)
				) {
					setContent(
						<PopupModal isOpen={true}>
							<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para escribir una evaluación" />
						</PopupModal>
					);
				} else {
					// cut out the "GraphQL error: " from error message
					const errorMessage = errors.message.substring(14);
					setSubmissionError(errorMessage);

					// Errors to display on form fields
					const formErrors = {};

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
			<Formik
				initialValues={merge(initialValues, {
					companyName,
				})}
				validationSchema={schema}
				onSubmit={onSubmit}
			>
				<InnerForm submissionError={submissionError} />
			</Formik>
			{content}
		</div>
	);
}
