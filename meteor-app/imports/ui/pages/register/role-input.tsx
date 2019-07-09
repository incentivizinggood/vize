import React from "react";
import { connect } from "formik";

import { i18n } from "meteor/universe:i18n";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function RoleInput({ formik }) {
	return (
		<>
			<label
				className={
					formik.values.role === "worker"
						? "role selected-role"
						: "role"
				}
				htmlFor="registerform-role-worker"
			>
				<input
					id="registerform-role-worker"
					name="role"
					type="radio"
					required
					value="worker"
					checked={formik.values.role === "worker"}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<T>employee</T>
			</label>
			<label
				className={
					formik.values.role === "company"
						? "role selected-role"
						: "role"
				}
				htmlFor="registerform-role-company"
			>
				<input
					id="registerform-role-company"
					name="role"
					type="radio"
					required
					value="company"
					checked={formik.values.role === "company"}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<T>employer</T>
			</label>
		</>
	);
}

export default connect(RoleInput);
