import React from "react";
import { connect } from "formik";
import { When, Case } from "/imports/ui/components/when";

import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

function RoleInput(props) {
	props.formik.values.role = "worker";
	console.log(props.showInput);
	return (
		<>
			<Case>
				<When cond={props.showInput}>
					<label
						className={
							props.formik.values.role === "worker"
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
							checked={props.formik.values.role === "worker"}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
						/>
						<T>employee</T>
					</label>
					<label
						className={
							props.formik.values.role === "company"
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
							checked={props.formik.values.role === "company"}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
						/>
						<T>employer</T>
					</label>
				</When>
			</Case>
		</>
	);
}

export default connect(RoleInput);
