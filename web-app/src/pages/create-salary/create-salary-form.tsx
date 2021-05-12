import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";

import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { useUser } from "src/hoc/user";
import { useCreateSalaryMutation } from "generated/graphql-operations";
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
	location: schemas.locationSchema,
	jobTitle: yup.string().required("Se requiere el nombre del cargo"),
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

export default function CreateSalaryForm({ companyName }) {
	const user = useUser();
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [content, setContent] = React.useState(null);
	const [createSalary] = useCreateSalaryMutation();

	const onSubmit = (values, actions) => {
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
				// Error in English: Not Logged In
				if (
					errors.message.includes(
						"Tienes que iniciar una sesión o registrarte"
					)
				) {
					setContent(
						<PopupModal isOpen={true} closeModalButtonColor="white">
							<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para agregar un salario" />
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
