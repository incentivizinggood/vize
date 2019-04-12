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
		const styles = {
			linkButton: {
				color: "blue",
				fontSize: 16,
				fontWeight: 600,
			},
		};

		const linkButton = {
			color: "blue",
			fontSize: 16,
			fontWeight: 600,
		};

		const errorDiv = {
			backgroundColor: "gainsboro",
		};

		let formContent = null;

		if (this.state.registerLogin === "register") {
			formContent = (
				<div>
					<RegisterForm showInput={false} />

					<div className="text-center login-link-cs">
						<br />
						<T>alreadyAccount</T>
						<button
							style={linkButton}
							onClick={this.changeRegisterLoginState}
						>
							<T>login</T>
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

		return (
			<div>
				<div style={errorDiv}>
					<h5>Register or login to write a review</h5>
				</div>
				{formContent}
			</div>
		);
	}
}
export default RegisterLoginModal;
