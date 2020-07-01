import React from "react";
import styled from "styled-components";

const X = styled.div`
	text-align: center;
`;

const LoginWithFacebook: React.FC = () => (
	<X>
		or <a href="/api/auth/facebook">Login with Facebook</a>
	</X>
);

export default LoginWithFacebook;
