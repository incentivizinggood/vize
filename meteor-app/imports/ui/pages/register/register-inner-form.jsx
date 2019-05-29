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

import RoleInput from "./role-input.jsx";
import FormGroup from "./form-group.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm({ errors, isSubmitting }) {
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
						<button
							form="register-form"
							type="submit"
							disabled={isSubmitting}
							className="btn-primary button"
						>
							<T>createAccount</T>
						</button>
					</div>
				</div>
			</IfFormik>
			<div>{JSON.stringify(errors)}</div>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
