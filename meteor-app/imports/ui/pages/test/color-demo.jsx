import React from "react";
import styled from "styled-components";

const Background = styled.div`
	background-color: ${props => props.theme.background};
	color: ${props => props.theme.onBackground};

	padding: 80px;
	padding-top: 10px;
	min-height: 100vh;
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
	background-color: ${props => props.theme.surface};
	color: ${props => props.theme.onSurface};

	grid-column: span 2;
`;

const SurfaceAccent = styled(Swatch)`
	background-color: ${props => props.theme.surfaceAccent};
	color: ${props => props.theme.onSurfaceAccent};

	margin-top: 40px;
	grid-column: span 2;
`;

const Main = styled(Swatch)`
	background-color: ${props => props.theme.main};
	color: ${props => props.theme.onMain};
`;

const MainVariant = styled(Main)`
	background-color: ${props => props.theme.mainVariant};
`;

export default function ColorDemo() {
	return (
		<Background>
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
