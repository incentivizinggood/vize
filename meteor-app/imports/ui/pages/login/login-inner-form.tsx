import React from "react";
import { Form } from "formik";

import { Field, FormToolbar } from "imports/ui/components/form-stuff";
import { Button } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

function InnerForm() {
	return (
		<Form noValidate>
			<Field name="username" type="text" required t={T.username} />

			<Field name="password" type="password" required t={T.password} />

			<FormToolbar>
				<Button primary type="submit">
					<T.login />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
