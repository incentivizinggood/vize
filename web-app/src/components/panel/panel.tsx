import styled from "styled-components";

import { forSize } from "src/responsive";
import colors from "src/colors";

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
	border-radius: 20px;

	background-color: white;
	color: black;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: ${PannelPadding};
`;

export default Panel;
export { PannelPadding };
