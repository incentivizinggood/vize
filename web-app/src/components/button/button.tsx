import styled, { css } from "styled-components";

import { colors, borderRadius } from "src/global-styles";

export interface ButtonExtraProps {
	/** Style this button to make it look more important. */
	$primary?: boolean;
	size?: string;
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
						color: white;
					`;
			}

			return css`
					background-color: white;
					color: ${colors.onSurfaceWeak};
					border: 1px solid;
				`;
		}

		if (props.$primary) {
			return css`
					background-color: ${colors.primaryColorBlue};
					color: white;
					:hover {
						background-color: ${colors.darkPrimaryBlue};
					}
				`;
		}

		return css`
				background-color: white;
				color: black !important;
				:hover {
					background-color: ${colors.lightGray};
					color: black;
				}
				border: 1px solid;
				border-color: ${colors.darkGray};
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
		padding: 0.9rem 3rem
	}};
		line-height: 1.5;
		border-radius: ${borderRadius.button};
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		cursor: pointer;
		text-decoration: none;
	}
`;

export default Button;
