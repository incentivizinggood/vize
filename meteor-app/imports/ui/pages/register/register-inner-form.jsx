import React from "react";
import { Field, Form, connect } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm({ errors, isSubmitting }) {
	const roleInput = connect(props => (
		<>
			<label
				className={
					this.state.role === "worker" ? "role selected-role" : "role"
				}
				htmlFor="registerform-role-worker"
			>
				<Field
					id="registerform-role-worker"
					name="role"
					type="radio"
					required
					value="worker"
					checked={props.formik.values.role === "worker"}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
				/>
				<T>employee</T>
			</label>
			<label
				className={
					this.state.role === "company"
						? "role selected-role"
						: "role"
				}
				htmlFor="registerform-role-company"
			>
				<Field
					id="registerform-role-company"
					name="role"
					type="radio"
					required
					value="company"
					checked={props.formik.values.role === "company"}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
				/>
				<T>employer</T>
			</label>
		</>
	));

	const usernameInput = (
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

	const emailInput = (
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

	const companyNameInput = (
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

	const passwordInput = (
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

	return (
		<Form id="register-form" style={{ display: "block" }}>
			<h3 className="top-head-employer" align="center">
				<T>register</T>
			</h3>
			{roleInput}
			<br />

			{this.state.role === "worker" || this.state.role === "company" ? (
				<div className="employer-fm">
					{usernameInput}

					{emailInput}

					{this.state.role === "company" ? companyNameInput : null}

					{passwordInput}

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
			) : null}
			<div>{JSON.stringify(errors)}</div>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
