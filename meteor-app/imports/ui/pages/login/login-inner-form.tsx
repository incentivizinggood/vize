import React from "react";
import { Form } from "formik";
import styled from "styled-components";

import { Field, FormToolbar } from "imports/ui/components/form-stuff";
import { Button } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

const LoginButton = styled(Button)`
	font-size: 22px;
	width: 100%;
	margin-top: 20px;
`;

function InnerForm() {
	return (
		<Form noValidate>
			<Field name="username" type="text" required t={T.username} />

			<Field name="password" type="password" required t={T.password} />

			<FormToolbar>
				<LoginButton primary type="submit">
					<T.login />
				</LoginButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
