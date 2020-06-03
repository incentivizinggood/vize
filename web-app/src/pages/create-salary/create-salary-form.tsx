import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";

import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { withUser } from "src/hoc/user";
import { CreateSalaryComponent as MutationCreateSalary } from "generated/graphql-operations";
import * as schemas from "src/form-schemas";

import InnerForm from "./create-salary-inner-form";

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
	location: {
		city: "",
		address: " ",
		industrialHub: "",
	},
	jobTitle: "",
	incomeType: "",
	incomeAmount: "",
	gender: "",
};

const schema = yup.object().shape({
	companyName: schemas.companyName.required(
		"Se requiere el nombre de la empresa"
	),
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
	gender: yup.string().oneOf(["MALE", "FEMALE"]),
});

function CreateSalaryForm({ history, companyName, user }) {
	const [submissionError, setSubmissionError] = React.useState(null);
	let [content, setContent] = React.useState(null);

	const onSubmit = (createSalary, history, setSubmissionError) => (
		values,
		actions
	) => {
		createSalary({
			variables: {
				input: omitEmptyStrings(values),
			},
		})
			.then(({ data }) => {
				console.log("data", data);

				actions.resetForm(initialValues);

				// Go to the review submitted page so that the user can claim their reward.
				history.push("/");
			})
			.catch(errors => {
				console.error(errors.message);
				if (errors.message === "GraphQL error: NOT_LOGGED_IN") {
					setContent(
						<PopupModal isOpen={true}>
							<RegisterLoginModal errorText="Regístrate o inicia una sesión para escribir una evaluación" />
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
			<MutationCreateSalary>
				{createSalary => (
					<Formik
						initialValues={merge(initialValues, {
							companyName,
						})}
						validationSchema={schema}
						onSubmit={onSubmit(
							createSalary,
							history,
							setSubmissionError
						)}
					>
						<InnerForm submissionError={submissionError} />
					</Formik>
				)}
			</MutationCreateSalary>
			{content}
		</div>
	);
}

export default withRouter(withUser(CreateSalaryForm));
