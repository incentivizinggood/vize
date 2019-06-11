import React from "react";
import { Form } from "formik";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import FormGroup from "/imports/ui/components/form-group";
import { Button } from "/imports/ui/components/button";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm() {
	return (
		<Form>
			<FormGroup
				fieldName="username"
				type="text"
				label={t("username")}
				placeholder={t("username")}
			/>
			<FormGroup
				fieldName="password"
				type="password"
				label={t("password")}
				placeholder={t("password")}
			/>

			<div className="button-center">
				<Button primary type="submit">
					<T>login</T>
				</Button>
			</div>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
