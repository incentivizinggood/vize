import React from "react";
import styled from "styled-components";

import bannerImg from "src/images/banner-img.jpg";

interface BannerDivExtraProps {
	backgroundImage?: string;
}

const BannerDiv = styled.div<BannerDivExtraProps>`
	height: 700px;

	background: url(${({ backgroundImage }) => backgroundImage || bannerImg})
		no-repeat 0 0;
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

function Banner({ children, backgroundImage }: BannerProps) {
	return (
		<BannerDiv backgroundImage={backgroundImage}>
			<div>{children}</div>
		</BannerDiv>
	);
}

export default Banner;