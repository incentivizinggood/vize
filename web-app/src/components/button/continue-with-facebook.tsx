import styled from "styled-components";
import { forSize } from "src/responsive";

const ContinueWithFacebookButton = styled.a`
	font-weight: bold;
	text-align: center;
	vertical-align: middle;
	padding: 13px 20px;
	line-height: 1.5;
	border-radius: 30px;
	color: white;
	display: inline-block;

	cursor: pointer;
	text-decoration: none;

	font-size: 22px;
	width: 100%;
	background-color: #4267b2;

	:hover {
		color: white;
		background-color: #0073d2;
	}

	${forSize.phoneOnly} {
		font-size: 17px;
	}
`;

export default ContinueWithFacebookButton;
