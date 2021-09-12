import styled from "styled-components";

import { forSize } from "src/responsive";
import colors from "src/colors";

const NavbarHeigh = "67px";

const PanelContainer = styled.div`
	width: 100%;
	height: 100%;
	max-width: 750px;
	margin-right: auto;
	margin-left: auto;

	background-color: ${colors.tertiaryColorLightBlue};
	padding: 112px 20px 20px 20px;
	${forSize.phoneOnly} {
		padding: ${NavbarHeigh} 0px 50px 0px;
	}
`;

export default PanelContainer;
