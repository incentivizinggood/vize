import React from "react";

import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

import LoginForm from "./login-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
function LoginPage() {
	return (
		<div className="page login">
			<div className="navbarwhite">
				<Header />
			</div>
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
			<Footer />
		</div>
	);
}

export default LoginPage;
