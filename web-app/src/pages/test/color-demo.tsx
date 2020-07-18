import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import NoGlobalStyle from "src/components/no-global-style";
import colors from "src/colors";

const Background = styled.div`
	background-color: ${colors.background};
	color: ${colors.onBackground};

	padding: 80px;
	padding-top: 10px;
	min-height: calc(100vh - 90px);
`;

const SwatchContainer = styled.div`
	width: 100%;
	height: 100%;

	max-width: 800px;
	margin-left: auto;
	margin-right: auto;

	display: grid;
	grid-template-columns: auto 30%;
`;

const SwatchBox = styled.div`
	padding: 20px;
`;
const SwatchP = styled.p`
	max-width: 20em;
`;

const Swatch = ({ name, className }) => (
	<SwatchBox className={className}>
		<h3>{name}</h3>
		<SwatchP>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Pellentesque egestas mi at est maximus euismod. Donec est nisl,
			egestas tristique est et, porttitor aliquet nibh. Etiam sit amet
			ornare nisi.
		</SwatchP>
	</SwatchBox>
);

const OnBackground = styled(Swatch)`
	grid-column: span 2;
`;

const Surface = styled(Swatch)`
	background-color: ${colors.surface};
	color: ${colors.onSurface};

	grid-column: span 2;
`;

const SurfaceAccent = styled(Swatch)`
	background-color: ${colors.surfaceAccent};
	color: ${colors.onSurfaceAccent};

	margin-top: 40px;
	grid-column: span 2;
`;

const Main = styled(Swatch)`
	background-color: ${colors.main};
	color: ${colors.onMain};
`;

const MainVariant = styled(Main)`
	background-color: ${colors.mainVariant};
`;

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
	}
`;

export default function ColorDemo() {
	return (
		<Background>
			<NoGlobalStyle />
			<GlobalStyle />
			<SwatchContainer>
				<OnBackground name="background" />

				<Main name="main" />
				<MainVariant name="mainVariant" />
				<Surface name="surface" />

				<SurfaceAccent name="surfaceAccent" />
			</SwatchContainer>
		</Background>
	);
}
