import styled from "styled-components";

import { forSize } from "src/responsive";
import { borderRadius, boxShadow } from "src/global-styles";

const PannelPadding = "30px";

interface Props {
	roundedEdges?: boolean;
}

const Panel = styled.div<Props>`
	${(props) =>
		props.roundedEdges && `border-radius: ${borderRadius.container};`};

	margin-left: auto;
	margin-right: auto;
	width: 100%;
	margin-bottom: 10px;
	border-radius: 20px;

	background-color: white;
	color: black;
	box-shadow: ${boxShadow.wide};
	padding: ${PannelPadding};
`;

export default Panel;
export { PannelPadding };
