import React from "react";
import styled from "styled-components";
import FacebookIcon from "src/images/icons/facebook-white-icon.png";
import { forSize } from "src/responsive";

import { ContinueWithFacebookButton } from "src/components/button";

const OrHorizontalLine = styled.h6`
	width: 100%;
	text-align: center;
	border-bottom: 1px solid lightgray;
	line-height: 0.1em;
	margin: 25px 0;

	span {
		background: #fff;
		padding: 0 10px;
	}
`;

const LoginWithFacebookWrapper = styled.div`
	width: 100%;
`;

const FacebookIconContainer = styled.img`
	width: 30px;
	height: 30px;
	margin-right: 25px;
	margin-bottom: 5px;

	${forSize.phoneOnly} {
		width: 20px;
		height: 20px;
		margin-right: 10px;
		margin-bottom: 5px;
	}
`;

export default function LoginWithFacebook(): JSX.Element {
	return (
		<LoginWithFacebookWrapper>
			<OrHorizontalLine>
				<span>o sino</span>
			</OrHorizontalLine>
			<ContinueWithFacebookButton href="/api/auth/facebook">
				<FacebookIconContainer src={FacebookIcon} />
				Continuar con Facebook
			</ContinueWithFacebookButton>
		</LoginWithFacebookWrapper>
	);
}
