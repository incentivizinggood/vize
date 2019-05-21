import styled, { css } from "styled-components";

const vizeBlue = "#2699FB";
const vizeDarkerBlue = "#1d80d6";

const Button = styled.a`
	&&&&&&&&& {

		/* Color the button to show it's status. */
		${props => {
			if (props.disabled) {
				if (props.primary) {
					return css`
						background-color: lightgrey;
						color: white;
					`;
				}

				return css`
					background-color: white;
					color: lightgrey;
					border: 1px solid;
				`;
			}

			if (props.primary) {
				return css`
					background-color: ${vizeBlue};
					color: white;
					:hover {
						background-color: ${vizeDarkerBlue};
					}
				`;
			}

			return css`
				background-color: white;
				color: ${vizeBlue};
				:hover {
					color: ${vizeDarkerBlue};
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
		border-radius: 0.25rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		cursor: pointer;
		text-decoration: none;
	}
`;

export default Button;
