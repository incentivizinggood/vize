import React from "react";
import styled from "styled-components";

import defaultBannerImage from "src/images/banner-img.jpg";

interface BannerContainerExtraProps {
	$image: string;
}

const BannerContainer = styled.div<BannerContainerExtraProps>`
	height: 700px;

	background: url(${props => props.$image}) no-repeat 0 0;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const BannerContent = styled.div`
	width: 100%;
	text-align: center;
`;

interface BannerProps {
	backgroundImage?: string;
	children: React.ReactNode;
}

function Banner({ children, backgroundImage }: BannerProps): JSX.Element {
	return (
		<BannerContainer $image={backgroundImage || defaultBannerImage}>
			<BannerContent>{children}</BannerContent>
		</BannerContainer>
	);
}

export default Banner;
