import styled from "styled-components";

import LinkButton from "./link-button.jsx";

/**
 * A legacy button component. Do not use in new code.
 */
const BlackBorderButton = styled(LinkButton)`
	&&&&&&&&& {
		/* Increase specificity to override global styles. */

		color: #343a40;
		background-color: transparent;
		background-image: none;
		border-color: #343a40;
		border-width: 4px;
		font-weight: 700;
		font-size: 2rem;

		&:hover {
			color: white;
			background-color: #343a40;
		}
	}
`;

export default BlackBorderButton;
