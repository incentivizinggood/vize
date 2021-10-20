import styled from "styled-components";
import { forSize } from "src/responsive";
import { boxShadow } from "src/global-styles";

const SectionContainer = styled.div`
	margin-bottom: 15px;
	background-color: white;
	padding: 10px 30px;

	box-shadow: ${boxShadow.wide};

	${forSize.phoneOnly} {
		padding: 10px;
	}
`;

export default SectionContainer;
