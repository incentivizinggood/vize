import React from "react";
import { Form } from "formik";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import FormGroup from "imports/ui/components/form-group";
import { Button } from "imports/ui/components/button";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm() {
	return (
		<Form>
			<div className="register-login-form">
				<FormGroup name="username" type="text" icon={faUser} />
				<FormGroup name="password" type="password" icon={faLock} />

				<div className="form-group text-center" />

				<div className="button-center">
					<Button primary type="submit">
						<T>login</T>
					</Button>
				</div>
			</div>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
