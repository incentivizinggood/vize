import React from "react";
import { Form } from "formik";
import {
	faLock,
	faUser,
	faEnvelope,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import IfFormik from "/imports/ui/components/if-formik.jsx";
import FormGroup from "/imports/ui/components/form-group";
import { Button } from "/imports/ui/components/button";

import RoleInput from "./role-input.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm() {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<RoleInput />
			<br />

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
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
			</IfFormik>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
