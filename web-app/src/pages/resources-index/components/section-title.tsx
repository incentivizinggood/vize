import styled from "styled-components";

import { forSize } from "src/responsive";
import { colors, boxShadow } from "src/global-styles";

const SectionTitle = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 15px;
	margin-bottom: 10px;
	width: 100%;
	text-align: center;

	font-size: 27px;
	font-weight: bold;

	background-color: white;
	color: black;
	box-shadow: ${boxShadow.wide};
	padding: 30px;

	${forSize.phoneOnly} {
		padding: 15px;
	}
`;

export default SectionTitle;
