import React from "react";

import RegisterForm from "imports/ui/pages/register/register-form";
import LoginForm from "imports/ui/pages/login/login-form";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

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
			backgroundColor: "crimson",
			margin: -4,
			marginBottom: 10,
			height: 50,
			textAlign: "center",
		};

		const errorText = {
			position: "relative",
			top: "50%",
			transform: "translateY(-50%)",
			color: "white",
			width: "80%",
			margin: "0 auto",
		};

		let formContent = null;

		if (this.state.registerLogin === "register") {
			formContent = (
				<div>
					<RegisterForm showInput={false} />

					<div className="text-center login-link-cs">
						<br />
						<T.alreadyAccount />
						<button
							style={linkButton}
							onClick={this.changeRegisterLoginState}
						>
							<T.login />
						</button>
						<div className="clearfix" />
					</div>
				</div>
			);
		} else {
			formContent = (
				<div>
					<h3 className="top-head-employer" align="center">
						<T.login />
					</h3>

					<br />

					<LoginForm />

					<div className="row">
						<div className="col-lg-12 text-center">
							<br />
							<T.noAccount />
							<button
								style={linkButton}
								onClick={this.changeRegisterLoginState}
							>
								<T.register />
							</button>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div style={errorDiv}>
					<h4 style={errorText}>
						<T.registerOrLogin />
					</h4>
				</div>
				{formContent}
			</div>
		);
	}
}
export default RegisterLoginModal;