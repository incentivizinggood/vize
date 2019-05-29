import styled, { css } from "styled-components";

import withScroll from "/imports/ui/hoc/scroll.jsx";

// How far down that the user can scroll before the navbar goes opaque.
const threshold = 100;

const FadableNav = styled.nav`
	${props => {
		if (props.animated && props.scroll < threshold) {
			// If we are using the animation, the navbar is transparent when
			// we are scrolled close to the top of the page.
			return null;
		}

		// These styles make the nav opaque.
		return css`
			background: white;
			box-shadow: 0 0 5px;

			ul li a {
				color: black;
				cursor: pointer;

				&:not(#register-button):hover,
				&:not(#register-button):focus,
				&:not(#register-button):active {
					color: black;
				}
			}
		`;
	}}
`;

export default withScroll(FadableNav);
