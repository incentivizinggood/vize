import styled, { css } from "styled-components";

import colors from "src/colors";

export interface ButtonExtraProps {
	/** Style this button to make it look more important. */
	$primary?: boolean;
}

const Button = styled.button<ButtonExtraProps>`
	&&&&&&&&& {
		/* Increase specificity to override global styles. */

		/* Color the button to show it's status. */
		${(props) => {
			if (props.disabled) {
				if (props.$primary) {
					return css`
						background-color: ${colors.onSurfaceWeak};
						color: ${colors.surface};
					`;
				}

				return css`
					background-color: ${colors.surface};
					color: ${colors.onSurfaceWeak};
					border: 1px solid;
				`;
			}

			if (props.$primary) {
				return css`
					background-color: ${colors.vizeBlue};
					color: ${colors.onMain};
					:hover {
						background-color: ${colors.mainVariant};
					}
				`;
			}

			return css`
				background-color: ${colors.surface};
				color: ${colors.main};
				:hover {
					color: ${colors.mainVariant};
				}
				border: 1px solid;
			`;
		}}

		/* Disabled buttons cannot be clicked */
		${(props) =>
			props.disabled &&
			css`
				pointer-events: none;
			`}

		font-weight: bold;

		display: inline-block;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		padding: 0.9rem 3rem;
		line-height: 1.5;
		border-radius: 30px;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		cursor: pointer;
		text-decoration: none;
	}
`;

export default Button;
