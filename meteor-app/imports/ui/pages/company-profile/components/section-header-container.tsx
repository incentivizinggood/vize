import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

const SectionHeaderContainer = styled.div`
	display: flex;
	background-color: white;
	min-height: 70px;
	margin-bottom: 20px;
	justify-content: space-between;
	border-bottom: 1px solid #dee0e3;

	${forSize.phoneOnly} {
		flex-direction: column;
		align-items: center;
		border: none;
	}
`;

export default SectionHeaderContainer;
