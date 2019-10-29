import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const PannelPadding = "30px";

const Panel = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 500px;

	background-color: ${props => props.theme.surface};
	color: ${props => props.theme.onSurface};
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: ${PannelPadding};

	${forSize.phoneOnly} {
		padding: 20px;
	}
`;

export default Panel;
export { PannelPadding };
