import styled, { css } from "styled-components";

export interface ButtonExtraProps {
	primary?: boolean;
}

const Button = styled.button<ButtonExtraProps>`
	&&&&&&&&& { /* Increase specificity to override global styles. */

		/* Color the button to show it's status. */
		${props => {
			if (props.disabled) {
				if (props.primary) {
					return css`
						background-color: ${props.theme.onSurfaceWeak};
						color: ${props.theme.surface};
					`;
				}

				return css`
					background-color: ${props.theme.surface};
					color: ${props.theme.onSurfaceWeak};
					border: 1px solid;
				`;
			}

			if (props.primary) {
				return css`
					background-color: #0d8dfb;
					color: ${props.theme.onMain};
					:hover {
						background-color: ${props.theme.mainVariant};
					}
				`;
			}

			return css`
				background-color: ${props.theme.surface};
				color: ${props.theme.main};
				:hover {
					color: ${props.theme.mainVariant};
				}
				border: 1px solid;
			`;
		}}

		/* Disabled buttons cannot be clicked */
		${props =>
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
		border-radius: 0.4rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		cursor: pointer;
		text-decoration: none;
	}
`;

export default Button;
