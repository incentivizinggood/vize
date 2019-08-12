import React from "react";
import { Form } from "formik";

import IfFormik from "imports/ui/components/if-formik";
import { Field } from "imports/ui/components/form-stuff";
import { Button } from "imports/ui/components/button";
import { FormToolbar } from "imports/ui/components/form-layout";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

function InnerForm() {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<T
				renderer={t => (
					<Field name="role" select label="I am a...">
						<option value="">(Select One)</option>
						<option value="worker">{t.employee}</option>
						<option value="company">{t.employer}</option>
					</Field>
				)}
			/>

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<Field name="username" type="text" t={T.username} />

				<Field name="email" type="email" t={T.email} />

				<IfFormik cond={formik => formik.values.role === "company"}>
					<Field name="companyName" type="text" t={T.companyName} />
				</IfFormik>

				<Field name="password" type="password" t={T.password} />

				<FormToolbar>
					<Button primary type="submit">
						<T.createAccount />
					</Button>
				</FormToolbar>
			</IfFormik>
		</Form>
	);
}

export default InnerForm;
