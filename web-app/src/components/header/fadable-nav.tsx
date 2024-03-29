import styled, { css } from "styled-components";
import { boxShadow } from "src/global-styles";
import withScroll from "src/hoc/scroll";

// How far down that the user can scroll before the navbar goes opaque.
const threshold = 100;

interface FadableNavExtraProps {
	animated?: boolean;
	scroll: number;
}

const FadableNav = styled.nav<FadableNavExtraProps>`
	${(props) => {
		if (props.animated && props.scroll < threshold) {
			// If we are using the animation, the navbar is transparent when
			// we are scrolled close to the top of the page.
			return null;
		}

		// These styles make the nav opaque.
		return css`
			background: white;
			box-shadow: ${boxShadow.wide};
		`;
	}}
`;

// TODO: Fix this type so that it works with out a type cast.
export default withScroll(FadableNav) as any as React.ComponentType<{
	animated?: boolean;
}>;
