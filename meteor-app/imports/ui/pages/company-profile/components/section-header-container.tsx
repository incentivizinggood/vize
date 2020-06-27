import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const SectionHeaderContainer = styled.div`
	display: flex;
	background-color: white;
	padding: 10px;
	justify-content: space-between;

	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	${forSize.phoneOnly} {
		flex-direction: column;
		align-items: center;
	}
`;

export default SectionHeaderContainer;
