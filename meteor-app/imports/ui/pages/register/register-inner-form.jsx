import React from "react";
import { Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import IfFormik from "./if-formik.jsx";
import RoleInput from "./role-input.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

const UsernameInput = () => (
	<div className="form-group">
		<label
			htmlFor="Username"
			className="icon-addon addon-md"
			rel="tooltip"
			title="Username"
		>
			<FontAwesomeIcon icon="user" className="fa" />
			<Field
				type="text"
				placeholder={t("username")}
				className="form-control"
				name="username"
				id="username"
				required
			/>
		</label>
	</div>
);

const EmailInput = () => (
	<div className="form-group">
		<label
			htmlFor="email"
			className="icon-addon addon-md"
			rel="tooltip"
			title="email"
		>
			<FontAwesomeIcon icon="envelope" className="fa" />
			<Field
				type="email"
				name="email"
				id="email"
				className="form-control"
				placeholder={t("email")}
			/>
		</label>
	</div>
);

const CompanyNameInput = () => (
	<div className="form-group">
		<label
			htmlFor="companyName"
			className="icon-addon addon-md"
			rel="tooltip"
			title="companyName"
		>
			<FontAwesomeIcon icon="building" className="fa" />
			<Field
				type="text"
				name="companyName"
				id="companyName"
				className="form-control"
				placeholder={t("companyName")}
			/>
		</label>
	</div>
);

const PasswordInput = () => (
	<div className="form-group">
		<label
			htmlFor="password"
			className="icon-addon addon-md pwd-line-sm"
			rel="tooltip"
			title="password"
		>
			<FontAwesomeIcon icon="lock" className="fa" />
			<Field
				type="password"
				name="password"
				id="password"
				className="form-control"
				placeholder={t("password")}
				required
			/>
		</label>
	</div>
);

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
				<div className="employer-fm">
					<UsernameInput />

					<EmailInput />

					<IfFormik cond={formik => formik.values.role === "company"}>
						<CompanyNameInput />
					</IfFormik>

					<PasswordInput />

					<div className="button-center">
						<button
							form="register-form"
							type="submit"
							disabled={isSubmitting}
							className="button out-bodr-get1"
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
