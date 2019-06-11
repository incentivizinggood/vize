import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";
import { Panel, PanelContainer } from "/imports/ui/components/panel";

import RegisterForm from "./register-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
function RegisterPage() {
	return (
		<PageWrapper title="Register">
			<PanelContainer>
				<Panel>
					<h3 className="top-head-employer" align="center">
						<T>register</T>
					</h3>
					<hr />
					<RegisterForm />
					<div className="text-center reg">
						<T>alreadyAccount</T>
						<Link to="/login">
							<T>login</T>
						</Link>
					</div>
				</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}
export default RegisterPage;
