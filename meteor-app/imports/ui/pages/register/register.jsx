import React from "react";

import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

import RegisterForm from "./register-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
function RegisterPage() {
	return (
		<div className="page register">
			<div className="navbarwhite">
				<Header />
			</div>
			<div className="container login-top-spce">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="panel panel-login register-work-employee">
							<div className="panel-body">
								<div className="row">
									<div className="col-lg-12">
										<RegisterForm />
									</div>
								</div>
							</div>
							<div className="panel-heading p-head">
								<div className="row">
									<div className="col-lg-12">
										<div className="text-center login-link-cs">
											<T>alreadyAccount</T>
											<a href="/login">
												{" "}
												<T>login</T>{" "}
											</a>
										</div>
										<div className="clearfix" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog />
			<Footer />
		</div>
	);
}
export default RegisterPage;
