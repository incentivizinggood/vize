import React from "react";
import { Form } from "formik";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

import FormGroup from "./form-group.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function InnerForm({ errors, isSubmitting }) {
	return (
		<Form>
			<div className="login-fm">
				<FormGroup name="username" type="text" icon="user" />
				<FormGroup name="password" type="password" icon="lock" />

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
								<Link to="/register">
									{" "}
									<T>register</T>
								</Link>
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
