import React from "react";
import styled from "styled-components";

import defaultBannerImage from "src/images/banner-img.jpg";

interface BannerDivExtraProps {
	$image: string;
}

const BannerDiv = styled.div<BannerDivExtraProps>`
	height: 700px;

	background: url(${props => props.$image}) no-repeat 0 0;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
	> div {
		width: 100%;
		text-align: center;
	}
`;

interface BannerProps {
	backgroundImage?: string;
	children: React.ReactNode;
}

function Banner({ children, backgroundImage }: BannerProps): JSX.Element {
	return (
		<BannerDiv $image={backgroundImage || defaultBannerImage}>
			<div>{children}</div>
		</BannerDiv>
	);
}

export default Banner;
