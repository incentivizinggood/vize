import React from "react";
import styled from "styled-components";

const X = styled.div`
	text-align: center;
`;

const LoginWithFacebook: React.FC = () => (
	<X>
		or <a href="/auth/facebook">Login with Facebook</a>
	</X>
);

export default LoginWithFacebook;
