import React from "react";
import { Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm({ errors, isSubmitting }) {
	const usernameInput = (
		<div className="form-group">
			<label
				htmlFor="username"
				className="icon-addon addon-md"
				rel="tooltip"
				title="Username"
			>
				<FontAwesomeIcon icon="user" className="fa" />
				<Field
					type="text"
					className="form-control"
					name="username"
					id="username"
					placeholder={t("username")}
					required
				/>
			</label>
		</div>
	);

	const passwordInput = (
		<div className="form-group">
			<label
				htmlFor="password"
				className="icon-addon addon-md"
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
		<Form>
			<div className="login-fm">
				{usernameInput}

				{passwordInput}

				<div className="form-group text-center" />

				<div className="button-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="enterTriggers"
					>
						<T>login</T>
					</button>
				</div>

				<div className="form-group">
					<div className="row">
						<div className="col-lg-12">
							<div className="text-center reg">
								<T>noAccount</T>
								<a href="/register">
									{" "}
									<T>register</T>
								</a>
							</div>
							<br />
						</div>
					</div>
				</div>
			</div>
			<div>{JSON.stringify(errors)}</div>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
