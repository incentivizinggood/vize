import React from "react";
import { Form } from "formik";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import IfFormik from "/imports/ui/components/if-formik.jsx";

import RoleInput from "./role-input.jsx";
import FormGroup from "./form-group.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm(props, { errors, isSubmitting }) {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<h3 className="top-head-employer" align="center">
				<T>register</T>
			</h3>
			<RoleInput showInput={props.showInput} />
			<br />

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<div className="employer-fm">
					<FormGroup name="username" type="text" icon="user" />

					<FormGroup name="email" type="email" icon="envelope" />

					<IfFormik cond={formik => formik.values.role === "company"}>
						<FormGroup
							name="companyName"
							type="text"
							icon="building"
						/>
					</IfFormik>

					<FormGroup name="password" type="password" icon="lock" />

					<div className="button-center">
						<button
							form="register-form"
							type="submit"
							disabled={isSubmitting}
							className="btn-primary button out-bodr-get1"
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
