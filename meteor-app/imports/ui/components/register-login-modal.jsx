import React from "react";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

import RegisterForm from "../pages/register/register-form.js";
import LoginForm from "../pages/login/login-form.js";

const t = i18n.createTranslator("common.loginRegister");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
class RegisterLoginModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerLogin: "register",
		};
		this.changeRegisterLoginState = this.changeRegisterLoginState.bind(
			this
		);
	}

	changeRegisterLoginState() {
		if (this.state.registerLogin === "register") {
			this.setState({ registerLogin: "login" });
		} else {
			this.setState({ registerLogin: "register" });
		}
	}

	render() {
		let formContent = null;

		if (this.state.registerLogin === "register") {
			formContent = (
				<div>
					<RegisterForm showInput={false} />

					<div className="text-center login-link-cs">
						<T>alreadyAccount</T>
						<button onClick={this.changeRegisterLoginState}>
							{" "}
							<T>login</T>{" "}
						</button>
						<div className="clearfix" />
					</div>
				</div>
			);
		} else {
			formContent = (
				<div>
					<h3 className="top-head-employer" align="center">
						<T>login</T>
					</h3>

					<LoginForm />
				</div>
			);
		}

		return <div>{formContent}</div>;
	}
}
export default RegisterLoginModal;
