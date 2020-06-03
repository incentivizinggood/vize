import React from "react";
import { Form } from "formik";
import styled from "styled-components";
import { Formik } from "formik";

import { Field, FormToolbar } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

const RegisterButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

function InnerForm(props) {
	if (props.userRole === "company") {
		let companyNameField = (
			<Field name="companyName" type="text" t={T.companyName} />
		);
	} else {
		let companyNameField = null;
	}

	return (
		<Form noValidate>
			<Field name="username" type="text" required t={T.username} />

			<Field name="email" type="email" required t={T.email} />

			{companyNameField}

			<Field name="password" type="password" required t={T.password} />

			<FormToolbar>
				<RegisterButton primary type="submit">
					<T.createAccount />
				</RegisterButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
