import React from "react";

import { RegisterForm } from "src/pages/register/register-form";
import LoginForm from "src/pages/login/login-form";
import { translations } from "src/translations";
import styled from "styled-components";

const T = translations.loginRegister;

const TitleText = styled.h2`
	text-align: center;
	font-weight: bold;
`;

/* The page where users can create an account.
 */
class RegisterLoginModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerLogin: "register",
		};
		this.changeRegisterLoginState =
			this.changeRegisterLoginState.bind(this);
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
			margin: -10,
			marginBottom: 10,
			height: 60,
			textAlign: "center",
		};

		const errorText = {
			position: "relative",
			top: "50%",
			transform: "translateY(-50%)",
			color: "white",
			width: "80%",
			margin: "0 auto",
			fontWeight: "bold",
		};

		let formContent = null;

		if (this.state.registerLogin === "register") {
			formContent = (
				<div>
					<TitleText>
						<T.register />
					</TitleText>

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
					<TitleText>
						<T.login />
					</TitleText>

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
					<h4 style={errorText}>{this.props.errorText}</h4>
				</div>
				{formContent}
			</div>
		);
	}
}

export default RegisterLoginModal;
