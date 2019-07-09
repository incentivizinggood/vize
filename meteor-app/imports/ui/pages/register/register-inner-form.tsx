import React from "react";
import { Form } from "formik";
import {
	faLock,
	faUser,
	faEnvelope,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import IfFormik from "imports/ui/components/if-formik";
import FormGroup from "imports/ui/components/form-group";
import { Button } from "imports/ui/components/button";

import RoleInput from "./role-input";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm() {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<h3 className="top-head-employer" align="center">
				<T>register</T>
			</h3>
			<RoleInput />
			<br />

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<div className="register-login-form">
					<FormGroup name="username" type="text" icon={faUser} />

					<FormGroup name="email" type="email" icon={faEnvelope} />

					<IfFormik cond={formik => formik.values.role === "company"}>
						<FormGroup
							name="companyName"
							type="text"
							icon={faBuilding}
						/>
					</IfFormik>

					<FormGroup name="password" type="password" icon={faLock} />

					<div className="button-center">
						<Button primary type="submit">
							<T>createAccount</T>
						</Button>
					</div>
				</div>
			</IfFormik>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
