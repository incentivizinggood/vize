import React from "react";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

import LoginForm from "./login-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<PageWrapper>
			<div className="container  login-top-spce">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="panel panel-login">
							<div className="panel-heading">
								<div className="row">
									<div className="col-xs-12">
										<br />
										<h3
											className="top-head-employer"
											align="center"
										>
											<T>login</T>
										</h3>
										<hr />
									</div>
								</div>
							</div>
							<div className="panel-body">
								<div className="row">
									<div className="col-lg-12">
										<LoginForm />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}

export default LoginPage;
