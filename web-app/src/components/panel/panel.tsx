import styled from "styled-components";

import { forSize } from "src/responsive";
import { colors } from "src/global-styles";

const PannelPadding = "30px";

interface Props {
	roundedEdges?: boolean;
}

const Panel = styled.div<Props>`
	${(props) => props.roundedEdges && "border-radius: 10px;"};

	margin-left: auto;
	margin-right: auto;
	width: 100%;
	margin-bottom: 10px;

	background-color: white;
	color: black;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: ${PannelPadding};

	${forSize.phoneOnly} {
		padding: 20px;
	}
`;

export default Panel;
export { PannelPadding };
