import React from "react";
import styled from "styled-components";

const X = styled.div`
	text-align: center;
`;

export default function LoginWithFacebook(): JSX.Element {
	return (
		<X>
			or <a href="/api/auth/facebook">Login with Facebook</a>
		</X>
	);
}
