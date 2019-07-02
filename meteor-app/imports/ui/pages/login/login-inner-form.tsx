import React from "react";
import { Form } from "formik";

import FormGroup from "imports/ui/components/form-group";
import { Button } from "imports/ui/components/button";
import { FormToolbar } from "imports/ui/components/form-layout";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

function InnerForm() {
	return (
		<Form>
			<T.username
				renderer={t => (
					<FormGroup
						fieldName="username"
						type="text"
						label={t.label}
						placeholder={t.placeholder}
					/>
				)}
			/>

			<T.password
				renderer={t => (
					<FormGroup
						fieldName="password"
						type="password"
						label={t.label}
						placeholder={t.placeholder}
					/>
				)}
			/>

			<FormToolbar>
				<Button primary type="submit">
					<T.login />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
