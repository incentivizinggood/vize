import styled from "styled-components";
import { forSize } from "src/responsive";

const FullWidthLineDivider = styled.hr`
	margin: 0 -30px;
	border-top: 2px solid #d6d5d5;

	${forSize.phoneOnly} {
		margin: 0 -10px;
	}
`;

export default FullWidthLineDivider;
