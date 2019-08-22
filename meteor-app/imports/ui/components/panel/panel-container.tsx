import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const PanelContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background};
	padding: 112px 20px 30px 20px;
	${forSize.phoneOnly} {
		padding: 60px 0px 0px 0px;
	}
`;

export default PanelContainer;
