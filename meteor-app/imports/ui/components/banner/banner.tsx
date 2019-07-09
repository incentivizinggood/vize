import React from "react";
import styled from "styled-components";

const BannerDiv = styled.div`
	height: 700px;

	background: url(${({ backgroundImage }) =>
			backgroundImage || "/images/banner-img.jpg"})
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

function Banner({ children, backgroundImage }) {
	return (
		<BannerDiv backgroundImage={backgroundImage}>
			<div>{children}</div>
		</BannerDiv>
	);
}

export default Banner;
