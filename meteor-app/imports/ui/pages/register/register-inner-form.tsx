import React from "react";
import { Form } from "formik";

import IfFormik from "imports/ui/components/if-formik";
import FormGroup from "imports/ui/components/form-group";
import { Button } from "imports/ui/components/button";
import { FormToolbar } from "imports/ui/components/form-layout";
import { translations } from "imports/ui/translations";

import RoleInput from "./role-input";

const T = translations.loginRegister;

function InnerForm() {
	return (
		<Form id="register-form" style={{ display: "block" }}>
			<RoleInput />

			<IfFormik
				cond={formik =>
					formik.values.role === "worker" ||
					formik.values.role === "company"
				}
			>
				<T.username
					renderer={t => (
						<FormGroup
							fieldName="username"
							type="text"
							label={t.label}
							placeholder={t.placeholder}
						/>
					)}
				/>

				<T.email
					renderer={t => (
						<FormGroup
							fieldName="email"
							type="email"
							label={t.label}
							placeholder={t.placeholder}
						/>
					)}
				/>

				<IfFormik cond={formik => formik.values.role === "company"}>
					<T.companyName
						renderer={t => (
							<FormGroup
								fieldName="companyName"
								type="text"
								label={t.label}
								placeholder={t.placeholder}
							/>
						)}
					/>
				</IfFormik>

				<T.password
					renderer={t => (
						<FormGroup
							fieldName="password"
							type="password"
							label={t.label}
							placeholder={t.placeholder}
						/>
					)}
				/>

				<FormToolbar>
					<Button primary type="submit">
						<T.createAccount />
					</Button>
				</FormToolbar>
			</IfFormik>
		</Form>
	);
}

export default InnerForm;
