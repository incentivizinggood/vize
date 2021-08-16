import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import PageWrapper from "src/components/page-wrapper";
import { LinkButton,WhiteButton } from "src/components/button";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import colors from "src/colors";
import { translations } from "src/translations";
import { useState, useEffect } from "react";

import resourcesIcon from "src/images/icons/resources-icon.png";
import bannerImage from "../../images/employer-banner-right-section.png";
const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const horizontalPaddingVal = "15px";

const Banner = styled.div`
	width:100%;
	height:400px;
	margin:0 14%;
	margin-top:100px;
	
`
const BannerContent = styled.div`
	display:flex;
	flex-direction:column;
`
const BannerNormalContent  = styled.span`
	font-size:50px;
	font-weight:600;
`
const BannerHighlightedContent  = styled.span`
	font-size:50px;
	font-weight: bolder;
	color:#3c4689;
`
const BannerVizeContent  = styled.span`
position:relative;
	font-size:50px;
	font-weight: bolder;
	color:#3c4689;
	z-index: 1;
`
const BannerSubTitle  = styled.div`
	font-size:20px;
	margin:10px 0px;
`
const VizeBackgroundEffect  = styled.div`
	background-color: #6abaf5;
	top: 35px;
	left: 0px;
	position: absolute;
	height: 12px;
	width: 100%;
	z-index: -1;
`
const BannerImage  = styled.img`
	height:480px;
`
const BannerButtonContainer  = styled.div`
	margin:40px 5px;
`
function ForEmployers() {
	// TODO Refactor: Refactor so that navbarheight is used as a global variable
	const [width, setWidth] = useState<number>(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	let isMobile: boolean = width <= 768;
	const navbarHeight = isMobile ? 65 : 75;
	return (
		<PageWrapper title="Empleadores">
			<Banner>
				<Row>
					<Col xs={12} md={5}>
						<BannerContent>
							<div>
								<BannerNormalContent>Hiring made </BannerNormalContent><BannerHighlightedContent>easier</BannerHighlightedContent>,<br/>
								<BannerHighlightedContent>faster</BannerHighlightedContent><BannerNormalContent>, and </BannerNormalContent> <BannerHighlightedContent>affordable</BannerHighlightedContent><br/>
								<BannerNormalContent>with</BannerNormalContent> <BannerVizeContent>Vize<VizeBackgroundEffect/></BannerVizeContent>
							</div>
							<div>
								<BannerSubTitle> Post jobs and we'll rank ad filter the right factory workers in<br/>
								Tijuana for your factory</BannerSubTitle>
							</div>
							<BannerButtonContainer>
								<LinkButton
											$primary
											to={
												urlGenerators.queryRoutes
													.submitSalaryData
											}
										>
											GET STARTED
								</LinkButton>
							</BannerButtonContainer>
						</BannerContent>
					</Col>
					<Col xs={12} md={7}>
						<BannerImage src={bannerImage} alt="employer-banner"></BannerImage>
					</Col>
				</Row>
			</Banner>
		</PageWrapper>
	);
}

export default ForEmployers;
