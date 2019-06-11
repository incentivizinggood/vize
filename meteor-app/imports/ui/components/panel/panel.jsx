import styled from "styled-components";

const Panel = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: max-content;

	background-color: ${props => props.theme.surface};
	color: ${props => props.theme.onSurface};
	border: 1px solid transparent;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: 30px;
`;

export default Panel;
