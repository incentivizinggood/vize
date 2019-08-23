import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar } from "imports/ui/components/form-stuff";
import { Button } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

const RegisterButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

// defining global variable because I do not want the value to change when user
// navigates from the register or login page. Esentially making it static
let userRole = localStorage.getItem("userRole");

function InnerForm(props) {
	if (props.location.state) {
		if (
			props.location.state.prevPath !== "/register" &&
			props.location.state.prevPath !== "/login"
		) {
			userRole = "worker";

			if (props.location.state.prevPath === "/for-employers") {
				userRole = "company";
			}
			// save the role to local storage so that the variable is not reset when page is refreshed
			localStorage.setItem("userRole", userRole);
		}
		if (userRole === "company") {
			let companyNameField = (
				<Field name="companyName" type="text" t={T.companyName} />
			);
		} else {
			let companyNameField = null;
		}
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
