import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

import RegisterForm from "./register-form.jsx";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
function RegisterPage() {
	return (
		<PageWrapper title="Register">
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
											<Link to="/login">
												<T>login</T>
											</Link>
										</div>
										<div className="clearfix" />
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
export default RegisterPage;
