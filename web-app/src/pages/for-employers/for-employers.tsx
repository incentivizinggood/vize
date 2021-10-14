/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { useQuery } from "react-apollo";

import { StarRatings as StartRatingsType } from "generated/graphql-operations";
import styled from "styled-components";
import { Row, Col, Table, Card } from "react-bootstrap";
import PageWrapper from "src/components/page-wrapper";
import { LinkButton, ExternalLinkButton } from "src/components/button";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { colors, borderRadius, boxShadow } from "src/global-styles";
import { translations } from "src/translations";
import { useState, useEffect } from "react";
import ResourcePreviewCard from "./resoource-preview-card";
import ResourceTopicButton from "./resource-topic-button";
import { JobPost } from "../../components/jobs/new-job-post";
import resourcesIcon from "src/images/icons/resources-icon.png";
import bannerImage from "../../images/employer-banner-right-section.png";
import arrowDownImage from "../../images/arrow-down-circle-line.png";
import getResultImage from "../../images/getResult.png";
import saveMoneyImage from "../../images/saveMoney.png";
import saveTimeImage from "../../images/saveTime.png";

import arrowDownCircleImage from "../../images/arrow-down-circle-line.png";
import navigationArrowImage from "../../images/job-post-icons/navifationarrow.png";
import navigationArrowImageGrey from "../../images/navigation-grey.png";
import topic1Image from "../../images/job-post-icons/topic-1.png";
import topic2Image from "../../images/job-post-icons/topic-2.png";
import topic3Image from "../../images/job-post-icons/topic-3.png";
import img1 from "../../images/workers.jpeg";

import employerPageResourcesQuery from "./employer-page-resources.graphql";
import { string } from "yup";

const T = translations.forEmployers;

const horizontalPaddingVal = "15px";

export interface JobPostInterface {
	id: string;
	created: Date;

	company: {
		id: string;
		name: string;
		avgStarRatings?: StartRatingsType;
		numReviews: number;
		descriptionOfCompany: string;

		industry: string;
		locations: {
			city: string;
			industrialPark: string;
			address: string;
		};
	};
	jobTitle: string;
	jobDescription: string;
	skills: string[];
	certificatesAndLicences?: string[];
	contractType: string;
	minimumEducation: string;
	minimumEnglishProficiency: string;
	shifts: {
		startDay: number;
		endDay: number;
		startTime: string;
		endTime: string;
	};
	salaryType?: string;
	salaryMax?: number;
	salaryMin?: number;
}
const ContentWrapper = styled.div`
	margin-left: 9%;
	margin-right: 9%;
	${forSize.tabletAndDown} {
		margin-left: 4%;
		margin-right: 4%;
	}
	@media only screen and (min-width: 1600px) {
		margin-left: 20%;
		margin-right: 20%;
	}
`;
const SignUpButton = styled(ExternalLinkButton)`
	font-size: 21px;
`;
const ResourcesButton = styled(LinkButton)`
	font-size: 21px;
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
	${forSize.tabletAndDown} {
		align-items: center;
	}
`;
const BannerContentWrapper = styled.div`
	${forSize.tabletAndDown} {
		text-align: center;
	}
`;
const BannerNormalContent = styled.span`
	font-size: 50px;
	font-weight: 600;
	${forSize.tabletAndDown} {
		font-size: 35px;
	}
`;
const BannerHighlightedContent = styled.span`
	font-size: 50px;
	font-weight: bolder;
	color: ${colors.secondaryColorGreen};
	${forSize.tabletAndDown} {
		font-size: 35px;
	}
`;
const BannerVizeContent = styled.span`
	position: relative;
	font-size: 50px;
	font-weight: bolder;
	margin-left: 5px;
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
		text-align: center;
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
	margin-bottom: 20px;
`;
const CardImageWrapper = styled.img`
	width: 75px;
	margin-bottom: 25px;
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	margin-top: 5px;
	margin-bottom: 20px;
	border-radius: ${borderRadius.container};
	padding: 30px;
	line-height: 1.6;
	box-shadow: ${boxShadow.wide};
	${forSize.tabletAndDown} {
		justify-content: center;
		align-items: center;
	}
	${forSize.tabletLandscapeAndDown} {
		height: 450px;
		width: auto !important;
	}
	${forSize.desktopAndDown} {
		height: 470px;
		width: 280px;
	}
	height: 420px;
	width: 290px;
`;
const BenefitCardDescription = styled.div`
	line-height: 1.8;
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
	align-items: center;
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
const SectionSubtitle = styled.div`
	font-size: 18px;
	text-align: center;
`;

const TableWrapper = styled.div``;

const StyledRankedTable = styled.div`
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin: 25px 0;
	> .table-responsive {
		border-radius: ${borderRadius.container};
		background-color: white;
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
	margin-bottom: 30px;
`;
const ResourceCardRow = styled(Row)`
	margin-top: 20px;
	display: flex;
`;

const ResourceCardNavigation = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;
const LeftNavigation = styled.div`
	border-radius: ${borderRadius.container};
	background-color: #fff;
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
	img {
		transform: rotate(90deg);
		height: 35px;
	}
`;
const RightNavigation = styled.div`
	border-radius: ${borderRadius.container};
	background-color: #fff;
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 15px;
	img {
		transform: rotate(270deg);
		height: 35px;
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
function ForEmployers({ audienceType }: { audienceType: string }): JSX.Element {
	// TODO Refactor: Refactor so that navbarheight is used as a global variable
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [activeResourceCard, setActiveResourceCard] = useState(0);
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
			nombre: "Jesús Bon",
			disponibildad: "Matutino",
			educacion: "Universidad Trunca",
			habilidades: "Productos Medicos",
			certificados: "Máquinas de CAC",
			ubicacion: "Otay",
			contacto: "664 555 8024",
		},
		{
			id: 2,
			clasificasion: "2",
			nombre: "José Carrillo",
			disponibildad: "Vespertino",
			educacion: "Preparatoria",
			habilidades: "Instrumentos de Medición",
			certificados: "Ninguno",
			ubicacion: "Florido",
			contacto: "664 555 6238",
		},
		{
			id: 3,
			clasificasion: "3",
			nombre: "Miguel Diaz",
			disponibildad: "Matutino",
			educacion: "Preparatoria",
			habilidades: "Productos Aeroespaciales",
			certificados: "Máquinas de AFM3D",
			ubicacion: "Camino Verde",
			contacto: "664 555 1287",
		},
		{
			id: 4,
			clasificasion: "4",
			nombre: "Francisco Cervantes",
			disponibildad: "Nocturno",
			educacion: "Preparatoria",
			habilidades: "Procesos Electrónicos",
			certificados: "Montacargas",
			ubicacion: "Florido",
			contacto: "664 555 8946",
		},
		{
			id: 5,
			clasificasion: "5",
			nombre: "Iván García",
			disponibildad: "Matutino",
			educacion: "Preparatoria",
			habilidades: "Moldeado de Plástico",
			certificados: "Máquinas de CNC",
			ubicacion: "El Lago",
			contacto: "664 555 6529",
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
	const jobPost: JobPostInterface = {
		company: "Foxconn",
		jobPost: "Operador de Producción",
		reviewCount: 32,
		rating: 3,
		published: "3 days ago",
		salaryRange: "$1.800 - $2.100 Pesos / Semana",
		jobType: "Proyecto (Temporal)",
		minEducation: "Preparatoria",
		industry: "Electrónica",
		englishProficiency: "Básico",
		shifts: [
			{ day: "lun - vie", time: "8 AM - 5 PM" },
			{ day: "lun - vie", time: "2 PM - 11 PM" },
			// { day: "mar - sab", time: "8 AM - 5 PM" },
		],
		city: "Tijuana",
		industrialPark: "El Lago",
		address: "Calle Lagua Maynar 5520, Section C",
		description:
			"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
		jobSkills: [
			"Maquinas Automatizadas",
			"Instrumentos de Medicion",
			"Uso de Computadora",
		],
		certifications: ["Instrumentos de Medicion", "Montacargas"],
		benifits: ["Seguro Social", "Seguro de Salud"],
	};

	const {
		loading,
		error,
		data: resourcesData,
	} = useQuery(employerPageResourcesQuery, {
		variables: { audienceType },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	const numResources = resourcesData.highlightedResources.length;

	return (
		<PageWrapper title="Empleadores">
			<ContentWrapper>
				<Banner>
					<Row>
						<Col xs={12} md={6}>
							<BannerContent>
								<BannerContentWrapper>
									<BannerNormalContent>
										<T.heading.hiringMade />{" "}
									</BannerNormalContent>
									<BannerHighlightedContent>
										<T.heading.easier />
									</BannerHighlightedContent>
									<BannerNormalContent>
										{", "}
									</BannerNormalContent>
									<BannerHighlightedContent>
										<T.heading.faster />
									</BannerHighlightedContent>
									<BannerNormalContent>
										, <T.heading.and />{" "}
									</BannerNormalContent>{" "}
									<BannerHighlightedContent>
										<T.heading.affordable />{" "}
									</BannerHighlightedContent>
									<BannerNormalContent>
										<T.heading.with />
									</BannerNormalContent>{" "}
									<BannerVizeContent>
										<T.heading.Vize />
										<VizeBackgroundEffect />
									</BannerVizeContent>
								</BannerContentWrapper>
								<BannerSubTitle>
									<T.subheading />
								</BannerSubTitle>
								<BannerButtonContainer>
									<SignUpButton
										$primary
										href="https://calendly.com/julian-vize/contratacion-con-vize"
										target="_blank"
									>
										<T.getStarted />
									</SignUpButton>
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
								<CardImageWrapper
									src={saveMoneyImage}
									alt="save-money"
								/>
								<CardTitle>
									<T.benefits.saveMoneyHeading />
								</CardTitle>
								<BenefitCardDescription>
									<T.benefits.saveMoneyDescription />
								</BenefitCardDescription>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWrapper
										src={saveTimeImage}
										alt="save-time"
									/>
								</CardIcon>
								<CardTitle>
									<T.benefits.saveTimeHeading />
								</CardTitle>
								<BenefitCardDescription>
									<T.benefits.saveTimeDescription />
								</BenefitCardDescription>
							</CardContent>
						</Col>
						<Col xs={12} md={4}>
							<CardContent>
								<CardIcon>
									<CardImageWrapper
										src={getResultImage}
										alt="get-result"
									/>
								</CardIcon>
								<CardTitle>
									<T.benefits.getResultsHeading />
								</CardTitle>
								<BenefitCardDescription>
									<T.benefits.getResultsDescription />
								</BenefitCardDescription>
							</CardContent>
						</Col>
					</Row>
					<SignupTodayWrapper>
						<SignUpButton
							$primary
							href="https://calendly.com/julian-vize/contratacion-con-vize"
							target="_blank"
						>
							<T.signUpToday />
						</SignUpButton>
					</SignupTodayWrapper>

					<HorizontalRow />
				</FeaturesWrapper>
				<JobPostWrapper>
					<SectionTitle>
						<T.exampleJobPost.heading />
					</SectionTitle>
					<SectionSubtitle>
						<T.exampleJobPost.subheading />
					</SectionSubtitle>
					<JobPost {...jobPost}></JobPost>
					<SignupTodayWrapper>
						<SignUpButton
							$primary
							href="https://calendly.com/julian-vize/contratacion-con-vize"
							target="_blank"
						>
							<T.signUpToday />
						</SignUpButton>
					</SignupTodayWrapper>
				</JobPostWrapper>

				<HorizontalRow />

				<TableWrapper>
					<SectionTitle>
						<T.rankedApplicants.heading />
					</SectionTitle>
					<SectionSubtitle>
						<T.rankedApplicants.subheading />
					</SectionSubtitle>
					<StyledRankedTable>
						<Table responsive>
							<thead>
								<tr>
									<th>Clasificasión</th>
									<th>Nombre</th>
									<th>Disponibilidad</th>
									<th>Educación</th>
									<th>Habilidades</th>
									<th>Certificados/Licencias</th>
									<th>Ubicación</th>
									<th>Contacto</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{userData.map((user) => (
									<tr key={user.id}>
										<td className="text-center">
											{user.clasificasion}
										</td>
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
					<SignupTodayWrapper>
						<SignUpButton
							$primary
							href="https://calendly.com/julian-vize/contratacion-con-vize"
							target="_blank"
						>
							<T.getStarted />
						</SignUpButton>
					</SignupTodayWrapper>

					<HorizontalRow />
				</TableWrapper>
				<ResourcesWrapper>
					<SectionTitle>
						<T.resources.heading />
					</SectionTitle>
					<SectionSubtitle>
						<T.resources.subheading />
					</SectionSubtitle>
					<ResourceCardRow>
						{resourcesData.highlightedResources.map(
							(resource: any, index: number) => (
								<ResourcePreviewCardVertical
									key={index}
									resource={resource}
									resourceIndex={index}
									isMobile={isMobile}
									audienceType={audienceType}
									activeResourceCard={activeResourceCard}
								/>
							)
						)}
					</ResourceCardRow>
					{isMobile ? (
						<ResourceCardNavigation>
							<LeftNavigation
								onClick={() => {
									setActiveResourceCard(
										activeResourceCard > 0
											? activeResourceCard - 1
											: activeResourceCard
									);
								}}
							>
								<img
									src={
										activeResourceCard > 0
											? navigationArrowImage
											: navigationArrowImageGrey
									}
									alt="left-navigation"
								></img>
							</LeftNavigation>
							<RightNavigation
								onClick={() => {
									setActiveResourceCard(
										activeResourceCard < numResources - 1
											? activeResourceCard + 1
											: activeResourceCard
									);
								}}
							>
								<img
									src={
										activeResourceCard < numResources - 1
											? navigationArrowImage
											: navigationArrowImageGrey
									}
									alt="right-navigation"
								></img>
							</RightNavigation>
						</ResourceCardNavigation>
					) : null}
				</ResourcesWrapper>

				<ResourcesWrapper>
					{/*<ResourceTopicTitle>Resource Topics</ResourceTopicTitle>
					<TopicsContent>
						<ResourceTopicButton
							title="Legal"
							img={topic1Image}
							onClick={() => {}}
						/>
						<ResourceTopicButton
							onClick={() => {}}
							title="Turnover Rates"
							img={topic2Image}
						/>
						<ResourceTopicButton
							onClick={() => {}}
							title="Hiring Best Practices"
							img={topic3Image}
						/>
						<ResourceTopicButton
							onClick={() => {}}
							title="View All Topics"
						/>
					</TopicsContent>
					*/}
					<ViewAllResourceWrapper>
						<ResourcesButton
							$primary
							to={urlGenerators.queryRoutes.employerResources}
						>
							<T.resources.viewMoreResources />
						</ResourcesButton>
					</ViewAllResourceWrapper>
				</ResourcesWrapper>
			</ContentWrapper>
		</PageWrapper>
	);
}

export default ForEmployers;
