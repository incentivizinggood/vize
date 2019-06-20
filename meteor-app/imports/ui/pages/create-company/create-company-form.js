import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import yup from "yup";
import { Mutation } from "react-apollo";

import * as schemas from "/imports/ui/form-schemas.js";
import { urlGenerators } from "/imports/ui/pages/url-generators.js";

import InnerForm from "./create-company-inner-form.jsx";
import createCompanyQuery from "./create-company.graphql";

const initialValues = {
	name: "",
	contactEmail: "",
	contactPhoneNumber: "",
	yearEstablished: "",
	numEmployees: "",
	industry: "",
	locations: [
		{
			city: "",
			address: "",
			industrialHub: "",
		},
	],
	websiteURL: "",
	descriptionOfCompany: "",
};

const schema = yup.object().shape({
	name: schemas.companyName.required(),
	contactEmail: yup
		.string()
		.email()
		.required(),
	contactPhoneNumber: yup.string().max(20),
	yearEstablished: yup.number().integer(),
	numEmployees: yup
		.mixed()
		.oneOf(["1 - 50", "51 - 500", "501 - 2000", "2001 - 5000", "5000+"]),
	industry: yup.string().max(50),
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
	websiteURL: yup
		.string()
		.url()
		.max(250),
	descriptionOfCompany: yup.string().max(6000),
});

const onSubmit = (createCompany, history) => (values, actions) => {
	createCompany({ variables: { input: values } }).then(({ data, errors }) => {
		if (errors) {
			console.error(errors);

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
		} else {
			actions.resetForm(initialValues);
			history.push(
				urlGenerators.vizeProfileUrl(data.createCompany.company.id)
			);
		}
	});
};

const CreateCompanyForm = props => (
	<Mutation mutation={createCompanyQuery}>
		{createCompany => (
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit(createCompany, props.history)}
			>
				<InnerForm />
			</Formik>
		)}
	</Mutation>
);

export default withRouter(CreateCompanyForm);