import React from "react";
import styled from "styled-components";
import { Row, Col, Table, Card } from "react-bootstrap";
import PageWrapper from "src/components/page-wrapper";
import { LinkButton, WhiteButton } from "src/components/button";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import colors from "src/colors";
import { translations } from "src/translations";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import ResourcePreviewCard from "./ResourcePreviewCard";
import ResourceTopicButton from "./ResourceTopicButton";
import resourcesIcon from "src/images/icons/resources-icon.png";
import bannerImage from "../../images/employer-banner-right-section.png";
import arrowDownImage from "../../images/arrow-down-circle-line.png";
import facebookImage from "../../images/facebook.png";
import getResultImage from "../../images/getResult.png";
import saveMoneyImage from "../../images/saveMoney.png";
import saveTimeImage from "../../images/saveTime.png";
import dollarImage from "../../images/job-post-icons/dollar.png";
import addressImage from "../../images/job-post-icons/address.png";
import languageImage from "../../images/job-post-icons/language.png";
import certificateImage from "../../images/job-post-icons/certificate.png";
import cityImage from "../../images/job-post-icons/city.png";
import descriptionImage from "../../images/job-post-icons/description.png";
import industrialParkImage from "../../images/job-post-icons/industrial-park.png";
import industryImage from "../../images/job-post-icons/industry.png";
import jobTypeImage from "../../images/job-post-icons/job-type.png";
import minEducationImage from "../../images/job-post-icons/min-education.png";
import shiftsImage from "../../images/job-post-icons/shifts.png";
import skillsImages from "../../images/job-post-icons/skills.png";
import arrowDownCircleImage from "../../images/arrow-down-circle-line.png";
import navigationArrowImage from "../../images/job-post-icons/navifationarrow.png";
import topic1Image from "../../images/job-post-icons/topic-1.png";
import topic2Image from "../../images/job-post-icons/topic-2.png";
import topic3Image from "../../images/job-post-icons/topic-3.png";
import img1 from "../../images/workers.jpeg";

const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const horizontalPaddingVal = "15px";
const ContentWrapper = styled.div`
	margin-left: 12%;
	margin-right: 12%;
	${forSize.tabletAndDown} {
		margin-left: 4%;
		margin-right: 4%;
	}
`;
const Banner = styled.div`
	margin-top: 150px;
	${forSize.tabletAndDown} {
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
	color: ${colors.secondaryColorGreen};
	${forSize.tabletAndDown} {
		font-size: 30px;
	}
`;
const BannerVizeContent = styled.span`
	position: relative;
	font-size: 50px;
	font-weight: bolder;
	color: ${colors.secondaryColorGreen};
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
	font-size: 24px;
`;
const CardImageWRapper = styled.img`
	width: 75px;
	margin-bottom: 25px;
`;

const CardContent = styled.div`
	height: 352px;
	display: flex;
	flex-direction: column;

	background-color: #ffffff;
	margin-top: 5px;
	margin-bottom: 10px;
	border-radius: 15px;
	padding: 30px;
	line-height: 1.6;
	${forSize.tabletAndDown} {
		justify-content: center;
		align-items: center;
	}
`;

const CardIcon = styled.div`
	width: 60px;
	// background-color: #ffffff;
`;
const SignupTodayWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
	margin-top: 20px;
`;
const HorizontalRow = styled.div`
	border-bottom: 1px solid #cfcfcf;
`;
const JobPostWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
const SectionTitle = styled.div`
	font-size: 36px;
	font-weight: 500;
	text-align: center;
	margin: 20px auto;
`;
const ResourceTopicTitle = styled.div`
	font-size: 28px;
	font-weight: 500;
	text-align: center;
	margin: 30px auto;
`;
const SectionSubTitle = styled.div`
	font-size: 18px;
	text-align: center;
`;
const JobPostCard = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
	background: #fff;
	border-radius: 6px;
	padding: 20px;
	.basic-details {
		border-bottom: 1px solid #d1d1d1;
		padding-bottom: 20px;
		margin-top: 20px;
	}
	.description {
		margin-top: 20px;
		span {
			font-weight: 600;
			padding-left: 10px;
		}
		.tags {
			margin-top: 5px;
			display: flex;
			flex-wrap: wrap;
		}
		.certificates {
			ul {
				margin: 0px;
				padding: 3px 25px;
			}
		}
	}
`;
const JobPostFirstRow = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostImage = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 6px;
	margin-right: 5px;
`;
const PostHeaderContent = styled.div``;
const PostTitle = styled.div`
	color: #acacac;
	font-size: 8px;
`;
const PostSubHeading = styled.div`
	font-weight: 700;
`;
const RatingWrapper = styled.div`
	display: flex;
	align-items: center;
`;
const JobPostHeaderRightSection = styled.div`
	display: flex;
	align-items: center;
`;
const JobPostHeaderLeftSection = styled.div`
	${forSize.tabletAndDown} {
		display: none;
	}
`;
const PublishDateWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const JobDetailsTitle = styled.div`
	color: ${colors.secondaryColorGreen};
	font-weight: 500;
	margin-bottom: 5px;
`;
const JobDetailvalue = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;
const JobDetailContent = styled.div`
	display: flex;
	padding-left: 10px;
	flex-wrap: wrap;
	div {
		margin-bottom: 5px;
		display: flex;
	}
`;
const JobDetailsWrapper = styled(Row)`
	.details-container {
		margin-bottom: 20px;
	}
`;
const LanguageContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-right: ${(p: { border: boolean }) =>
		p.border ? "1px solid #efefef" : ""};
	padding-right: 10px;
	margin-right: 10px;
`;
const LanguageTitle = styled.span`
	color: #c2c2c2;
`;
const LanguageDescription = styled.span`
	font-weight: 600;
`;
const LanguageImage = styled.img`
	width: 26px;
	height: 26px;
`;
const DescriptionTag = styled.div`
	padding: 8px 10px;
	border-radius: 16px;
	color: ${colors.secondaryColorGreen};
	background-color: #d9e4f6;
	margin-right: 5px;
	margin-bottom: 5px;
`;
const TableWrapper = styled.div``;

const StyledRankedTable = styled.div`
	margin: 25px 0;
	> .table-responsive {
		border-radius: 16px;
		background-color: white;
		text-align: center;
		> .table {
			margin-bottom: 0px;
			> thead {
				background-color: ${colors.secondaryColorGreen};
				color: white;
				> tr {
					> th {
						padding: 15px;
						font-size: 14px;
					}
				}
			}
			> tbody {
				> tr {
					> td {
						font-size: 14px;
						font-weight: 600;
						padding: 0.7rem 0.7rem;
					}
				}
			}
		}
	}
`;
const ResourcesWrapper = styled.div`
	.inactive {
		display: none;
	}
`;
const ResourceCardRow = styled(Row)`
	margin-top: 20px;
`;

const ResourceCardNavigation = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;
const LeftNavigation = styled.div`
	border-radius: 6px;
	background-color: #fff;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
	img {
		transform: rotate(90deg);
	}
`;
const RightNavigation = styled.div`
	border-radius: 6px;
	background-color: #fff;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 5px;
	img {
		transform: rotate(270deg);
	}
`;
const TopicsContent = styled.div`
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	justify-content: center;
	${forSize.tabletAndDown} {
		flex-direction: column;
		align-items: center;
	}
`;
const ViewAllResourceWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
`;
function ForEmployers() {
	// TODO Refactor: Refactor so that navbarheight is used as a global variable
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [activeResourceCard, setActiveResourceCard] = useState(1);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	const userData = [
		{
			id: 1,
			clasificasion: "1",
			nombre: "jedus Bon",
			disponibildad: "matution",
			educacion: "universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Maquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
		{
			id: 2,
			clasificasion: "2",
			nombre: "jedus Bon",
			disponibildad: "matution",
			educacion: "universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Maquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
		{
			id: 3,
			clasificasion: "3",
			nombre: "jedus Bon",
			disponibildad: "matution",
			educacion: "universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Maquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
		{
			id: 4,
			clasificasion: "4",
			nombre: "jedus Bon",
			disponibildad: "matution",
			educacion: "universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Maquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
		{
			id: 5,
			clasificasion: "5",
			nombre: "jedus Bon",
			disponibildad: "matution",
			educacion: "universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Maquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
	];
	const resources = [
		{
			id: 1,
			date: "July 26, 20120",
			title: "Cras gravida bibendum dolor eu varius. Morbi fermentum velit nisl eget vehicula",
			text: " Duis vestibulum elit vel neque pharatra valpputate. Quisque sceierisque nisi urna. Duis retrum non risus in imperdet. Proin molestie accumsan nula",
			img: img1,
		},
		{
			id: 2,
			date: "July 30, 20120",
			title: "Cras gravida bibendum dolor eu varius. Morbi fermentum velit nisl eget vehicula",
			text: " Duis vestibulum elit vel neque pharatra valpputate. Quisque sceierisque nisi urna. Duis retrum non risus in imperdet. Proin molestie accumsan nula",
			img: img1,
		},
		{
			id: 3,
			date: "Aug 4, 20120",
			title: "Cras gravida bibendum dolor eu varius. Morbi fermentum velit nisl eget vehicula",
			text: " Duis vestibulum elit vel neque pharatra valpputate. Quisque sceierisque nisi urna. Duis retrum non risus in imperdet. Proin molestie accumsan nula",
			img: img1,
		},
	];
	const isMobile: boolean = width <= 768;
	const navbarHeight = isMobile ? 65 : 75;
	const jobDescriptions = [
		"Neque Curabitur Faucibus",
		"Praesent Non",
		"Est Dolor",
		"Consectetur Lobortis",
		"Dolor",
	];
	const jobSkills = [
		"Neque Curabitur Faucibus",
		"Praesent Non",
		"Est Dolor",
		"Consectetur Lobortis",
		"Dolor",
	];
	const certifications = [
		"Nisl Sodales Auctor",
		"Quam Fringilla Sed",
		"Rhoncus Diam",
		"Mauris Faucibs",
	];
	console.log("isMobile", isMobile);
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
										Post jobs and we'll rank ad filter the
										right factory workers in
										<br />
										Tijuana for your factory
									</BannerSubTitle>
								</div>
								<BannerButtonContainer>
									<LinkButton
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
								<CardImageWRapper
									src={saveMoneyImage}
									alt="save-money"
								/>
								<CardTitle>Save Money</CardTitle>
								<div>
									Get two months of free and unlimited job
									posts by signing up today.You can hire
									workforce you need easier, faster, and more
									affordable by reaching over 3000 factory
									workers on our site.
								</div>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWRapper
										src={saveTimeImage}
										alt="save-time"
									/>
								</CardIcon>
								<CardTitle>Save Time</CardTitle>
								<div>
									We rank and filter all of you application on
									a weekly basis to find factory workers that
									are tailored to your needs (availability,
									skills,education level, and more) so you
									don't have to start tough CVs yourself
								</div>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWRapper
										src={getResultImage}
										alt="get-result"
									/>
								</CardIcon>
								<CardTitle>Get Results</CardTitle>
								<div>
									You Only pay for results. we charge 5 pesos
									per job application, rather than charging a
									monthly subscriotion. This saves you money,
									gives you a flexibility, to post as many
									jobs as you need, when you need them, and
									for however many workers you need.
								</div>
							</CardContent>
						</Col>
					</Row>
					<SignupTodayWrapper>
						<LinkButton
							$primary
							to={urlGenerators.queryRoutes.submitSalaryData}
						>
							SIGN UP TODAY
						</LinkButton>
					</SignupTodayWrapper>
					<HorizontalRow></HorizontalRow>
				</FeaturesWrapper>
				<JobPostWrapper>
					<SectionTitle>Job Posts</SectionTitle>
					<SectionSubTitle>
						Get your job posts in front of the right people
					</SectionSubTitle>
					<JobPostCard>
						<JobPostFirstRow>
							<JobPostHeaderRightSection>
								<PostImage
									src={facebookImage}
									alt="post-image"
								/>
								<PostHeaderContent>
									<PostTitle>Facebook</PostTitle>
									<PostSubHeading>
										UI/UX Designer
									</PostSubHeading>
									<RatingWrapper>
										<ReactStars
											count={3.5}
											size={18}
											activeColor="#ffd700"
										/>
										<PostTitle>32 Reviews</PostTitle>
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
									</PostTitle>{" "}
									3 days ago
								</PublishDateWrapper>
							</JobPostHeaderLeftSection>
						</JobPostFirstRow>
						<div className="basic-details">
							<JobDetailsWrapper>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>SALARY</JobDetailsTitle>
									<JobDetailContent>
										<img
											src={dollarImage}
											alt="dollar-img"
										/>
										<JobDetailvalue>
											Rs 40,000 - Rs 50,000 / Month
										</JobDetailvalue>
									</JobDetailContent>
								</Col>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>JOB TYPE</JobDetailsTitle>
									<JobDetailContent>
										<img
											src={jobTypeImage}
											alt="dollar-img"
										/>
										<JobDetailvalue>
											Permanent
										</JobDetailvalue>
									</JobDetailContent>
								</Col>
							</JobDetailsWrapper>
							<JobDetailsWrapper>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>
										MIN EDUCATION
									</JobDetailsTitle>
									<JobDetailContent>
										<img
											src={minEducationImage}
											alt="dollar-img"
										/>
										<JobDetailvalue>
											Completed High School
										</JobDetailvalue>
									</JobDetailContent>
								</Col>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>Industry</JobDetailsTitle>
									<JobDetailContent>
										<img
											src={industryImage}
											alt="dollar-img"
										/>
										<JobDetailvalue>
											Aerospace
										</JobDetailvalue>
									</JobDetailContent>
								</Col>
							</JobDetailsWrapper>
							<JobDetailsWrapper>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>
										MIN LANGUAGE PROFICIENCY
									</JobDetailsTitle>
									<JobDetailContent>
										<LanguageImage
											src={languageImage}
											alt="dollar-img"
										/>
										<LanguageContentWrapper border>
											<LanguageTitle>
												English
											</LanguageTitle>
											<LanguageDescription>
												Conversational
											</LanguageDescription>
										</LanguageContentWrapper>
										<LanguageContentWrapper border={false}>
											<LanguageTitle>
												Spanish
											</LanguageTitle>
											<LanguageDescription>
												Native
											</LanguageDescription>
										</LanguageContentWrapper>
									</JobDetailContent>
								</Col>
								<Col
									xs={12}
									md={6}
									className="details-container"
								>
									<JobDetailsTitle>SHIFTS</JobDetailsTitle>
									<JobDetailContent>
										<LanguageImage
											src={shiftsImage}
											alt="dollar-img"
										/>
										<LanguageContentWrapper border>
											<LanguageTitle>
												Mon - Fri
											</LanguageTitle>
											<LanguageDescription>
												8 AM - 6 PM
											</LanguageDescription>
										</LanguageContentWrapper>
										<LanguageContentWrapper border>
											<LanguageTitle>
												Mon - Fri
											</LanguageTitle>
											<LanguageDescription>
												8 AM - 6 PM
											</LanguageDescription>
										</LanguageContentWrapper>
										<LanguageContentWrapper border={false}>
											<LanguageTitle>
												Mon - Fri
											</LanguageTitle>
											<LanguageDescription>
												8 AM - 6 PM
											</LanguageDescription>
										</LanguageContentWrapper>
									</JobDetailContent>
								</Col>
							</JobDetailsWrapper>
							<JobDetailsWrapper>
								<Col
									xs={12}
									md={12}
									className="details-container"
								>
									<JobDetailsTitle>LOCATION</JobDetailsTitle>
									<JobDetailContent>
										<div>
											<LanguageImage
												src={cityImage}
												alt="dollar-img"
											/>
											<LanguageContentWrapper border>
												<LanguageTitle>
													City
												</LanguageTitle>
												<LanguageDescription>
													Tijuana
												</LanguageDescription>
											</LanguageContentWrapper>
										</div>
										<div>
											<LanguageImage
												src={industrialParkImage}
												alt="dollar-img"
											/>
											<LanguageContentWrapper border>
												<LanguageTitle>
													Industrial Park
												</LanguageTitle>
												<LanguageDescription>
													EL Logo
												</LanguageDescription>
											</LanguageContentWrapper>
										</div>
										<div>
											<LanguageImage
												src={addressImage}
												alt="dollar-img"
											/>
											<LanguageContentWrapper
												border={false}
											>
												<LanguageTitle>
													Address
												</LanguageTitle>
												<LanguageDescription>
													Calle Lagua Maynar 5520,
													Section C
												</LanguageDescription>
											</LanguageContentWrapper>
										</div>
									</JobDetailContent>
								</Col>
							</JobDetailsWrapper>
						</div>
						<div className="description">
							<div className="df">
								<img src={descriptionImage} alt=""></img>
								<span>Description</span>
							</div>
							<div className="tags">
								{jobDescriptions.map((v) => {
									return (
										<DescriptionTag key={v}>
											{v}
										</DescriptionTag>
									);
								})}
							</div>
						</div>
						<div className="description">
							<div className="df">
								<img src={skillsImages} alt=""></img>
								<span>Skilld Required</span>
							</div>
							<div className="tags">
								{jobSkills.map((v) => {
									return (
										<DescriptionTag key={v}>
											{v}
										</DescriptionTag>
									);
								})}
							</div>
						</div>
						<div className="description">
							<div className="df">
								<img src={certificateImage} alt=""></img>
								<span>Certificates & Licences</span>
							</div>
							<div className="certificates">
								<ul>
									{certifications.map((v) => {
										return <li key={v}>{v}</li>;
									})}
								</ul>
							</div>
						</div>
					</JobPostCard>
					<SignupTodayWrapper>
						<LinkButton
							$primary
							to={urlGenerators.queryRoutes.submitSalaryData}
						>
							SIGN UP TODAY
						</LinkButton>
					</SignupTodayWrapper>
					<HorizontalRow></HorizontalRow>
				</JobPostWrapper>
				<TableWrapper>
					<SectionTitle>Ranked Applicants</SectionTitle>
					<SectionSubTitle>
						Find factory workers that are tailored to your needs
						(availability, skills, education, level and more)
					</SectionSubTitle>
					<StyledRankedTable>
						<Table responsive>
							<thead>
								<tr>
									<th>Clasificasion</th>
									<th>Nombre</th>
									<th>Disponibildad</th>
									<th>Educacion</th>
									<th>Habilidades</th>
									<th>Certificados/Licencias</th>
									<th>Ubicacion</th>
									<th>Contacto</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{userData.map((user) => (
									<tr key={user.id}>
										<td>{user.clasificasion}</td>
										<td>{user.nombre}</td>
										<td>{user.disponibildad}</td>
										<td>{user.educacion}</td>
										<td>{user.habilidades}</td>
										<td>{user.certificados}</td>
										<td>{user.ubicacion}</td>
										<td>{user.contacto}</td>
										<td>
											<img
												src={arrowDownCircleImage}
												alt=""
											></img>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</StyledRankedTable>
					<HorizontalRow></HorizontalRow>
				</TableWrapper>
				<ResourcesWrapper>
					<SectionTitle>Resources</SectionTitle>
					<SectionSubTitle>
						Improve your HR practices by learning about industry
						best standards with our resources
					</SectionSubTitle>
					<ResourceCardRow>
						{resources.map((resource) => (
							<ResourcePreviewCard
								key={resource.id}
								resource={resource}
								isMobile={isMobile}
								activeResourceCard={activeResourceCard}
							/>
						))}
					</ResourceCardRow>
					{isMobile ? (
						<ResourceCardNavigation>
							<LeftNavigation
								onClick={() => {
									setActiveResourceCard(
										activeResourceCard > 1
											? activeResourceCard - 1
											: activeResourceCard
									);
								}}
							>
								<img
									src={navigationArrowImage}
									alt="left-navigation"
								></img>
							</LeftNavigation>
							<RightNavigation
								onClick={() => {
									setActiveResourceCard(
										activeResourceCard < 3
											? activeResourceCard + 1
											: activeResourceCard
									);
								}}
							>
								<img
									src={navigationArrowImage}
									alt="right-navigation"
								></img>
							</RightNavigation>
						</ResourceCardNavigation>
					) : null}
				</ResourcesWrapper>
				<ResourcesWrapper>
					<ResourceTopicTitle>Resource Topics</ResourceTopicTitle>
					<TopicsContent>
						<ResourceTopicButton title="Legal" img={topic1Image} />
						<ResourceTopicButton
							title="Turnover Rates"
							img={topic2Image}
						/>
						<ResourceTopicButton
							title="Hiring Best Practices"
							img={topic3Image}
						/>
						<ResourceTopicButton title="View All Topics" />
					</TopicsContent>
					<ViewAllResourceWrapper>
						<LinkButton
							$primary
							to={urlGenerators.queryRoutes.employerResources}
						>
							View All Resources
						</LinkButton>
					</ViewAllResourceWrapper>
				</ResourcesWrapper>
			</ContentWrapper>
		</PageWrapper>
	);
}

export default ForEmployers;
