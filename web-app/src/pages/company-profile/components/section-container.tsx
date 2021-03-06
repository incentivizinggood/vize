import styled from "styled-components";
import { forSize } from "src/responsive";

const SectionContainer = styled.div`
	margin-bottom: 15px;
	background-color: white;
	padding: 10px 30px;

	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	${forSize.phoneOnly} {
		padding: 10px;
	}
`;

export default SectionContainer;
