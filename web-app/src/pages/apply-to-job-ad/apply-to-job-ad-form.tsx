import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { useUser } from "src/hoc/user";
import * as urlGenerators from "src/pages/url-generators";

import { useApplyToJobAdMutation } from "generated/graphql-operations";
import { useGetJobTitleAndCompanyIdQuery } from "generated/graphql-operations";

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

const onSubmit = (
	applyToJobAd,
	history,
	setSubmissionError,
	setLoginRegisterModal,
	companyID,
) => (values, actions) =>
	applyToJobAd({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			actions.resetForm(initialValues);

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: values.jobAdId,
			});

			history.push(`/${urlGenerators.queryRoutes.jobApplicationSubmitted}?id=${companyID}`);
		})
		.catch(errors => {
			// Error in English: Not Logged In
			if (
				errors.message.includes(
					"Tienes que iniciar una sesión o registrarte"
				)
			) {
				setLoginRegisterModal(
					<PopupModal isOpen={true}>
						<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para postularte a este trabajo" />
					</PopupModal>
				);
			} else {
				// cut out the "GraphQL error: " from error message
				const errorMessage = errors.message.substring(14);
				setSubmissionError(errorMessage);

				// Errors to display on form fields
				const formErrors = {};

				actions.setErrors(formErrors);
				actions.setSubmitting(false);
			}
		});

export interface ApplyToJobAdFormProps {
	jobAdId: string;
}

export default function ApplyToJobAdForm({ jobAdId }: ApplyToJobAdFormProps) {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [applyToJobAd] = useApplyToJobAdMutation();
	const { data } = useGetJobTitleAndCompanyIdQuery({
		variables: { jobAdId },
	});
	const user = useUser();

	const jobTitle = data?.jobAd?.jobTitle;
	const companyID = data?.jobAd?.company.id;

	if (user) {
		loginRegisterModal = null;
	}

	return (
		<>
			<Formik
				initialValues={merge(initialValues, {
					jobAdId,
					jobTitle,
				})}
				validationSchema={schema}
				onSubmit={onSubmit(
					applyToJobAd,
					history,
					setSubmissionError,
					setLoginRegisterModal,
					companyID
				)}
			>
				<InnerForm submissionError={submissionError} />
			</Formik>
			{loginRegisterModal}
		</>
	);
}
