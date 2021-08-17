import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import PageWrapper from "src/components/page-wrapper";
import { LinkButton, WhiteButton } from "src/components/button";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import colors from "src/colors";
import { translations } from "src/translations";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import resourcesIcon from "src/images/icons/resources-icon.png";
import bannerImage from "../../images/employer-banner-right-section.png";
import arrowDownImage from "../../images/arrow-down-circle-line.png";
import facebookImage from "../../images/facebook.png";
import getResultImage from "../../images/getResult.png";
import saveMoneyImage from "../../images/saveMoney.png";
import saveTimeImage from "../../images/saveTime.png";
const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const horizontalPaddingVal = "15px";
const ContentWrapper = styled.div`
	margin-left: 14%;
	margin-right: 14%;
	${forSize.tabletAndDown} {
		margin-left: 8%;
		margin-right: 8%;
	}
`;
const Banner = styled.div`
	margin-top: 150px;
	margin-left: 14%;
	margin-right: 14%;
	${forSize.tabletAndDown} {
		margin-left: 8%;
		margin-right: 8%;
		margin-top: 130px;

	}
`;
const BannerContent = styled.div`
	display: flex;
	flex-direction: column;
`;
const BannerNormalContent = styled.span`
	font-size: 50px;
	font-weight: 600;
	${forSize.tabletAndDown} {
		font-size: 30px;
	}
`;
const BannerHighlightedContent = styled.span`
	font-size: 50px;
	font-weight: bolder;
	color: #3c4689;
	${forSize.tabletAndDown} {
		font-size: 30px;
	}
`;
const BannerVizeContent = styled.span`
	position: relative;
	font-size: 50px;
	font-weight: bolder;
	color: #3c4689;
	z-index: 1;
	${forSize.tabletAndDown} {
		font-size: 30px;
	}
`;
const BannerSubTitle = styled.div`
	font-size: 20px;
	margin: 10px 0px;
	${forSize.tabletAndDown} {
		font-size: 14px;
	}
`;
const VizeBackgroundEffect = styled.div`
	background-color: #6abaf5;
	top: 35px;
	left: 0px;
	position: absolute;
	height: 12px;
	width: 100%;
	z-index: -1;
	${forSize.tabletAndDown} {
		top: 21px;
    	height: 6px;
	}
`;
const BannerImage = styled.img`
	height: 480px;
	${forSize.tabletAndDown} {
		height: 320px;
	}
`;
const BannerButtonContainer = styled.div`
	margin: 40px 5px;
`;
const FeaturesWrapper = styled.div`
	margin-bottom: 20px;
	margin-top: 40px;
`;
const CardTitle = styled.div`
	font-size:24px;
`;
const CardImageWRapper = styled.img`
	width: 75px;
	margin-bottom: 25px;
`;

const CardContent = styled.div`
	height: 352px;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	margin-top: 5px;
	margin-bottom: 10px;
	border-radius: 15px;
	padding: 30px;
	line-height: 1.6;
`;

const CardIcon = styled.div`
	width: 60px;
	// background-color: #ffffff;
`;
const SignupTodayWrapper = styled.div`
	display:flex;
	justify-content:center;
	margin-bottom:20px;
`;
const HorizontalRow = styled.div`
	border-bottom:1px solid #efefef;
`;
const JobPostWrapper = styled.div`
	display:flex;
	flex-direction:column;
`;
const SectionTitle = styled.div`
	font-size:36px;
	font-weight:500;
	margin: 20px auto; 
`;
const SectionSubTitle = styled.div`
	font-size:18px;
	text-align:center;
`;
const JobPostCard = styled.div`
	margin-top:20px;
	background:#fff;
	border-radius:6px;
	padding:10px;
`;
const JobPostFirstRow = styled.div`
	display:flex;
	justify-content:space-between;
`;
const PostImage = styled.img`
	height: 50px;
    width: 50px;
    border-radius: 6px;
	margin-right:5px;
`;
const PostHeaderContent = styled.div`

`;
const PostTitle = styled.div`
	color:#acacac;
	font-size:8px;
`;
const PostSubHeading = styled.div`
	font-weight:700;
`;
const RatingWrapper = styled.div`
	display:flex;
	align-items:center;
`;
const JobPostHeaderRightSection = styled.div`
	display:flex;
	align-items:center;
`;
const JobPostHeaderLeftSection = styled.div`

`;
const PublishDateWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
`;

const CardText = styled.div``;

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

	const isMobile: boolean = width <= 768;
	const navbarHeight = isMobile ? 65 : 75;

	return (
		<PageWrapper title="Empleadores">
			<ContentWrapper>
				<Banner>
					<Row>
						<Col xs={12} md={6}>
							<BannerContent>
								<div>
									<BannerNormalContent>
										Hiring made{" "}
									</BannerNormalContent>
									<BannerHighlightedContent>
										easier
									</BannerHighlightedContent>
									,<br />
									<BannerHighlightedContent>
										faster
									</BannerHighlightedContent>
									<BannerNormalContent>
										, and{" "}
									</BannerNormalContent>{" "}
									<BannerHighlightedContent>
										affordable
									</BannerHighlightedContent>
									<br />
									<BannerNormalContent>
										with
									</BannerNormalContent>{" "}
									<BannerVizeContent>
										Vize
										<VizeBackgroundEffect />
									</BannerVizeContent>
								</div>
								<div>
									<BannerSubTitle>
										{" "}
										Post jobs and we'll rank ad filter the right
										factory workers in
										<br />
										Tijuana for your factory
									</BannerSubTitle>
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
						<Col xs={12} md={6}>
							<BannerImage
								src={bannerImage}
								alt="employer-banner"
							></BannerImage>
						</Col>
					</Row>
				</Banner>


				<FeaturesWrapper>
					<Row>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWRapper src={saveMoneyImage} alt="save-money" />
								</CardIcon>
								<CardTitle>
									Save Money
								</CardTitle>
								<CardText>
									Get two months of free and unlimited job
									posts by signing up today.You can hire
									workforce you need easier, faster, and more
									affordable by reaching over 3000 factory
									workers on our site.
								</CardText>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWRapper src={saveTimeImage} alt="save-time" />
								</CardIcon>
								<CardTitle>
									Save Time
								</CardTitle>
								<CardText>
									We rank and filter all of you application on
									a weekly basis to find factory workers that
									are tailored to your needs (availability,
									skills,education level, and more) so you
									don't have to start tough CVs yourself
								</CardText>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>

							<CardContent>
								<CardIcon>
									<CardImageWRapper src={getResultImage} alt="get-result" />
								</CardIcon>
								<CardTitle>
									Get Results
								</CardTitle>
								<CardText>
									You Only pay for results. we charge 5 pesos
									per job application, rather than charging a
									monthly subscriotion. This saves you money,
									gives you a flexibility, to post as many
									jobs as you need, when you need them, and
									for however many workers you need.
								</CardText>
							</CardContent>
						</Col>
					</Row>
					<SignupTodayWrapper>
						<LinkButton
							$primary
							to={
								urlGenerators.queryRoutes
									.submitSalaryData
							}
						>
							SIGN UP TODAY
						</LinkButton>
					</SignupTodayWrapper>
					<HorizontalRow></HorizontalRow>
				</FeaturesWrapper>
				<JobPostWrapper>
					<SectionTitle>
						Job Posts
					</SectionTitle>
					<SectionSubTitle>
						Get your job posts in front of the right people
					</SectionSubTitle>
					<JobPostCard>
						<JobPostFirstRow>
							<JobPostHeaderRightSection>
								<PostImage src={facebookImage} alt="post-image" />
								<PostHeaderContent>
									<PostTitle>
										Facebook
									</PostTitle>
									<PostSubHeading>
										UI/UX Designer
									</PostSubHeading>
									<RatingWrapper>
										<ReactStars
											count={3.5}
											size={18}
											activeColor="#ffd700"
										/>
										<PostTitle>
											32 Reviews
										</PostTitle>
									</RatingWrapper>
								</PostHeaderContent>
							</JobPostHeaderRightSection>
							<JobPostHeaderLeftSection>
								<LinkButton
									$primary
									to={
										urlGenerators.queryRoutes
											.submitSalaryData
									}
								>
									SIGN UP TODAY
								</LinkButton>
								<PublishDateWrapper>
									<PostTitle>
										Published&nbsp;:&nbsp;
									</PostTitle> 3 days ago
								</PublishDateWrapper>
							</JobPostHeaderLeftSection>
						</JobPostFirstRow>
					</JobPostCard>
				</JobPostWrapper>
			</ContentWrapper>
		</PageWrapper>
	);
}

export default ForEmployers;