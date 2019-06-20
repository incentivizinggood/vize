import React from "react";
import { Form } from "formik";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import IfFormik from "/imports/ui/components/if-formik.jsx";
import FormGroup from "/imports/ui/components/form-group";
import { Button } from "/imports/ui/components/button";
import { FormToolbar } from "/imports/ui/components/form-layout.jsx";

import RoleInput from "./role-input.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm() {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<RoleInput />

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<FormGroup
					fieldName="username"
					type="text"
					label={t("username")}
					placeholder={t("username")}
				/>

				<FormGroup
					fieldName="email"
					type="email"
					label={t("email")}
					placeholder={t("email")}
				/>

				<IfFormik cond={formik => formik.values.role === "company"}>
					<FormGroup
						fieldName="companyName"
						type="text"
						label={t("companyName")}
						placeholder={t("companyName")}
					/>
				</IfFormik>

				<FormGroup
					fieldName="password"
					type="password"
					label={t("password")}
					placeholder={t("password")}
				/>

				<FormToolbar>
					<Button primary type="submit">
						<T>createAccount</T>
					</Button>
				</FormToolbar>
			</IfFormik>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
