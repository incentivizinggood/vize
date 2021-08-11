import React from "react";
import styled from "styled-components";

import defaultBannerImage from "src/images/banner-img.jpg";

interface BannerContainerExtraProps {
	$image: string;
}

const BannerContainer = styled.div<BannerContainerExtraProps>`
	height: 700px;

	background: url(${(props) => props.$image}) no-repeat 0 0;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const BannerContent = styled.div`
	width: 100%;
	text-align: center;
`;

/** Use in a banner to overlay a header for the page. */
export const BannerTitle = styled.h1`
	display: block;
	margin-bottom: 40px;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;

	font-size: 3em;
	line-height: 1.2em;
	font-weight: 700;
	color: white;

	padding-left: 15px;
	padding-right: 15px;
`;

interface BannerProps {
	backgroundImage?: string;
	children: React.ReactNode;
}

/** Use at the top of a page to display an image with optional title overlay. */
function Banner({ children, backgroundImage }: BannerProps): JSX.Element {
	return (
		<BannerContainer $image={backgroundImage || defaultBannerImage}>
			<BannerContent>{children}</BannerContent>
		</BannerContainer>
	);
}

export default Banner;
