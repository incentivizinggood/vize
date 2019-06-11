import styled from "styled-components";

const Panel = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: max-content;

	background-color: ${props => props.theme.surface};
	border: 1px solid transparent;
	border-radius: 4px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	padding: 30px;
`;

export default Panel;
