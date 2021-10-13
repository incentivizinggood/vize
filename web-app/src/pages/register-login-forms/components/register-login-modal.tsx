import React from "react";

import { RegisterForm } from "src/pages/register-login-forms/register-form";
import LoginForm from "src/pages/register-login-forms/login-form";
import { translations } from "src/translations";
import styled from "styled-components";

const T = translations.loginRegister;

const TitleText = styled.h2`
	text-align: center;
	font-weight: bold;
`;

/* The page where users can create an account.
 */

interface RegisterLoginModalInterface {
	errorText: string;
	userRole?: string;
}

export default function RegisterLoginModal({
	errorText,
	userRole,
}: RegisterLoginModalInterface): JSX.Element {
	const [registerLogin, setRegisterOrLogin] = React.useState("register");

	function changeRegisterLoginState(): void {
		if (registerLogin === "register") {
			setRegisterOrLogin("login");
		} else {
			setRegisterOrLogin("register");
		}
	}

	function setRegisterOrLoginFunction(newState: string): void {
		setRegisterOrLogin(newState);
	}

	const errorDiv = {
		backgroundColor: "crimson",
		margin: -10,
		marginBottom: 10,
		height: 60,
		textAlign: "center",
	};

	const errorTextStyle = {
		position: "relative",
		top: "50%",
		transform: "translateY(-50%)",
		color: "white",
		width: "80%",
		margin: "0 auto",
		fontWeight: "bold",
	};

	let formContent = null;

	if (registerLogin === "register") {
		formContent = (
			<div>
				<TitleText>
					<T.register />
				</TitleText>

				<RegisterForm
					setRegisterOrLogin={setRegisterOrLoginFunction}
					userRole={userRole ? userRole : "worker"}
				/>
			</div>
		);
	} else {
		formContent = (
			<div>
				<TitleText>
					<T.login />
				</TitleText>

				<LoginForm
					setRegisterOrLogin={setRegisterOrLoginFunction}
					userRole={userRole ? userRole : "worker"}
				/>
			</div>
		);
	}

	return (
		<div>
			<div style={errorDiv}>
				<h4 style={errorTextStyle}>{errorText}</h4>
			</div>
			{formContent}
		</div>
	);
}
