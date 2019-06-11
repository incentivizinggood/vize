import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";
import { Panel, PanelContainer } from "/imports/ui/components/panel";

import LoginForm from "./login-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<PageWrapper title="Login">
			<PanelContainer>
				<Panel>
					<h3 className="top-head-employer" align="center">
						<T>login</T>
					</h3>
					<hr />
					<LoginForm />
					<div className="text-center reg">
						<T>noAccount</T>
						<Link to="/register">
							<T>register</T>
						</Link>
					</div>
				</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}

export default LoginPage;
