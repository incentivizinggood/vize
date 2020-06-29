import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const SectionHeaderContainer = styled.div`
	display: flex;
	background-color: white;
	padding: 10px;
	min-height: 70px;
	justify-content: space-between;

	${forSize.phoneOnly} {
		flex-direction: column;
		align-items: center;
	}
`;

export default SectionHeaderContainer;
