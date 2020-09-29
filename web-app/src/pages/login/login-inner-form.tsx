import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar } from "src/components/form-stuff";
import { Button } from "src/components/button";
import { translations } from "src/translations";

const T = translations.loginRegister;

const LoginButton = styled(Button)`
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
	}
	return (
		<Form noValidate>
			<Field name="loginId" type="text" required t={T.loginId} />

			<Field name="password" type="password" required t={T.password} />

			<FormToolbar>
				<LoginButton $primary type="submit">
					<T.login />
				</LoginButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
