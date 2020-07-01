import styled from "styled-components";
import { forSize } from "src/responsive";

const SectionHeaderTitle = styled.h3`
	color: black;
	display: flex;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;

	${forSize.phoneOnly} {
		text-align: center;
		margin-top: 5px;
		margin-bottom: 15px;
	}
`;

export default SectionHeaderTitle;
