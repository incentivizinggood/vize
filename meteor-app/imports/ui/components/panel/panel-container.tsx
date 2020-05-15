import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const NavbarHeigh = "67px";

const PanelContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background};
	padding: 112px 20px 20px 20px;

	${forSize.phoneOnly} {
		padding: ${NavbarHeigh} 0px 50px 0px;
	}
`;

export default PanelContainer;
