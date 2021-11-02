import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { Button } from "src/components/button";
import RatingsDropdown from "../ratings-dropdown";
import { colors, borderRadius, boxShadow } from "src/global-styles";
import { forSize } from "src/responsive";
import CloseIcon from "@material-ui/icons/Close";
import { absoluteDateToRelativeDate } from "src/utils";
import { JobShift } from "../job-shift";
import {
	contractTypeTranlsations,
	salaryTypeTranlsations,
	educationTranslations,
	languageProficiencyTranslations,
} from "api-server/src/utils/translation-utils";

// Types
import {
	StarRatings as Ratings,
	Company,
	CompanySalaryStats as Salary,
} from "generated/graphql-operations";

// Images & Icons
import defaultCompanyIcon from "src/images/default-company.png";
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
import ReplyIcon from "@material-ui/icons/Reply";
import ReactMarkdown from "react-markdown";

const ShiftContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.border ? "1px solid #efefef" : ""};
	padding-right: 10px;
	margin-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.withImage ? "10px" : ""};
`;

const JobPostCard = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
	background: #fff;
	border-radius: ${borderRadius.container};
	padding: 20px;
	box-shadow: ${boxShadow.wide};
	max-width: 700px;
`;
const JobRequirementWrapper = styled.div`
	margin-top: 20px;
`;
const JobRequirementTitle = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;
const JobRequirementDescription = styled.div`
	margin-top: 10px;
	display: flex;
	flex-wrap: wrap;
	margin-left: 10px;
`;
const JobBasicDetails = styled.div`
	border-bottom: 1px solid #d1d1d1;
	padding-bottom: 20px;
	padding-top: 20px;
`;
const JobPostTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostImage = styled.img`
	height: 60px;
	width: 60px;
	border-radius: 6px;
	margin: 0px 20px 0px 0px;
	${forSize.phoneOnly} {
		height: 55px;
		width: 55px;
		margin: 0px 8px 0px 0px;
	}
`;
const PostHeaderContent = styled.div``;
const PostTitle = styled.div`
	color: black;
	font-size: 13px;
	${forSize.phoneOnly} {
		font-size: 11px;
	}
`;
const ReviewCount = styled.div`
	color: black;
	font-size: 13px;
	margin-left: 5px;
`;
const PostSubHeading = styled.div`
	font-weight: 700;
	font-size: 18px;
	${forSize.phoneOnly} {
		font-size: 14px;
	}
`;
const RatingWrapper = styled.div`
	display: flex;
	align-items: center;
`;
const JobPostHeaderRightSection = styled.div`
	display: flex;
`;
const JobPostHeaderLeftSection = styled.div`
	align-items: flex-end;
	display: flex;
	flex-direction: column;
`;

const JobDetailsTitle = styled.div`
	color: black;
	font-weight: 500;
	margin-bottom: 5px;
`;
const JobDetailvalue = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;
const JobDetailContent = styled.div`
	display: flex;
	// padding-left: 10px;
	flex-wrap: wrap;
	img {
		width: 18px;
		height: 18px;
	}
`;
const LocationContainer = styled.div`
	display: flex;
	// padding-left: 10px;
	flex-wrap: wrap;
	img {
		width: 18px;
		height: 18px;
	}
	${forSize.tabletAndDown} {
		flex-direction: column;
		div {
			border: none;
		}
	}
`;
const JobDetailContainer = styled.div`
	margin-bottom: 5px;
	display: flex;
`;
const JobDetailsWrapper = styled(Row)`
	.details-container {
		margin-bottom: 20px;
	}
`;
const LanguageContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.border ? "1px solid #efefef" : ""};
	padding-right: 10px;
	margin-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.withImage ? "10px" : ""};
`;
const LanguageTitle = styled.span`
	color: black;
`;
const LanguageDescription = styled.span`
	font-weight: 600;
`;
const LanguageImage = styled.img`
	width: 26px;
	height: 26px;
`;
const DatePosted = styled.span`
	font-size: 12px;
`;
const DescriptionTag = styled.div`
	padding: 8px 10px;
	border-radius: ${borderRadius.container};
	// color: ${colors.secondaryColorGreen};
	background-color: #126e4e1c;
	margin-right: 5px;
	margin-bottom: 5px;
`;
const ActionsWrapper = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 430px;
	${forSize.tabletAndDown} {
		width: auto;
	}
	${forSize.phoneOnly} {
		justify-content: space-around;

		button {
			// width: 125px;
			// padding: 0.7rem 0.4rem !important;
			font-size: 19px;
		}
	}
`;
const ReplyIconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		transform: scale(-1, 1);
		margin-right: 5px;
	}
`;
const CloseButton = styled.div`
	display: flex;
	align-items: center;
	background-color: #efefef;
	border-radius: 50%;
	padding: 12px;
	cursor: pointer;
`;

export interface Review {
	review: {
		additionalComments?: string;
		pros: string;
		cons: string;
		created: Date;
		jobTitle: string;
		numberOfMonthsWorked: number;
		title: string;
		wouldRecommendToOtherJobSeekers: boolean;
		starRatings: Ratings;

		location: {
			city: string;
			industrialHub?: string;
		};
	};
}

// export interface Company {
// 	id: string;
// 	name: string;
// 	avgStarRatings?: Ratings;
// 	numReviews: number;
// 	descriptionOfCompany: string;
// 	industry: string;
// 	numEmployees: number;
// 	websiteURL: string;
// 	locations: {
// 		city: string;
// 		industrialPark: string;
// 		address: string;
// 	};
// 	reviews?: Review[];
// }

export interface JobPost {
	id: string;
	created: Date;

	company: Company;
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

export const JobPostTitleRow = function (props: JobPost): JSX.Element {
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

	function ModalButtons(): JSX.Element {
		return (
			<ActionsWrapper>
				{/* <Button>
				<ReplyIconWrapper>
					<ReplyIcon />
					<span>Compartir</span>
				</ReplyIconWrapper>
			</Button> */}
				<Button
					$primary
					onClick={(e) => {
						e.stopPropagation();

						if (props.externalJobPostURL) {
							window.open(props.externalJobPostURL, "_blank");
						} else {
							props.onClose();
							props.showApplyToJobModal();
						}
						analytics.sendEvent({
							category: "User",
							action: "Apply To Job Button Pressed (Full Details)",
							label: props.company.name,
						});
					}}
					style={{ marginRight: "10px" }}
				>
					Postularme
				</Button>
			</ActionsWrapper>
		);
	}

	const datePosted = new Date(props.created);
	const DatePostedComponent = (): JSX.Element => {
		return absoluteDateToRelativeDate(datePosted);
	};

	const companyProfileIcon = props.company.companyIconURL
		? props.company.companyIconURL
		: defaultCompanyIcon;

	return (
		<>
			<JobPostTitle>
				<JobPostHeaderRightSection>
					<PostImage src={companyProfileIcon} alt="post-image" />
					<PostHeaderContent>
						<PostTitle>{props.company.name}</PostTitle>
						<PostSubHeading>{props.jobTitle}</PostSubHeading>
						{props.company.avgStarRatings && (
							<RatingWrapper>
								<RatingsDropdown
									ratings={{
										healthAndSafety:
											props.company.avgStarRatings
												.healthAndSafety,
										managerRelationship:
											props.company.avgStarRatings
												.managerRelationship,
										workEnvironment:
											props.company.avgStarRatings
												.workEnvironment,
										benefits:
											props.company.avgStarRatings
												.benefits,
										overallSatisfaction:
											props.company.avgStarRatings
												.overallSatisfaction,
									}}
									numReviews={props.company.numReviews}
									companyId={props.company.id}
								/>
							</RatingWrapper>
						)}

						{props.modal && width < 450 ? (
							<DatePosted>
								<DatePostedComponent />
							</DatePosted>
						) : null}
					</PostHeaderContent>
				</JobPostHeaderRightSection>

				{props.modal ? (
					<JobPostHeaderLeftSection>
						<ActionsWrapper>
							{width > 450 ? <ModalButtons /> : null}
							<CloseButton
								onClick={(e) => {
									e.stopPropagation();
									props.onClose();
								}}
							>
								<CloseIcon />
							</CloseButton>
						</ActionsWrapper>
						{width > 450 ? (
							<span>
								<DatePostedComponent />
							</span>
						) : null}
					</JobPostHeaderLeftSection>
				) : null}
			</JobPostTitle>
			{props.modal && width < 450 ? <ModalButtons></ModalButtons> : null}
		</>
	);
};
export const JobContentWrapper = function (
	props: JobPostInterface
): JSX.Element {
	const minimumEducation = educationTranslations[props.minimumEducation];
	const minimumEnglishProficiency =
		languageProficiencyTranslations[props.minimumEnglishProficiency];
	const contractType = contractTypeTranlsations[props.contractType];
	const salaryType = props.salaryType
		? salaryTypeTranlsations[props.salaryType]
		: null;
	return (
		<>
			<JobBasicDetails>
				<JobDetailsWrapper>
					{props.salaryMin && props.salaryMax && props.salaryType && (
						<Col xs={12} md={6} className="details-container">
							<JobDetailsTitle>Salario</JobDetailsTitle>
							<JobDetailContent>
								<img src={dollarImage} alt="dollar-img" />
								<JobDetailvalue>
									{props.salaryMin} - {props.salaryMax} /{" "}
									{salaryType}
								</JobDetailvalue>
							</JobDetailContent>
						</Col>
					)}
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Tipo de Contrato</JobDetailsTitle>
						<JobDetailContent>
							<img src={jobTypeImage} alt="dollar-img" />
							<JobDetailvalue>{contractType}</JobDetailvalue>
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
				<JobDetailsWrapper>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Educación Minima</JobDetailsTitle>
						<JobDetailContent>
							<img src={minEducationImage} alt="dollar-img" />
							<JobDetailvalue>{minimumEducation}</JobDetailvalue>
						</JobDetailContent>
					</Col>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Industria</JobDetailsTitle>
						<JobDetailContent>
							<img src={industryImage} alt="dollar-img" />
							<JobDetailvalue>
								{props.company.industry}
							</JobDetailvalue>
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
				<JobDetailsWrapper>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Dominio del Inglés</JobDetailsTitle>
						<JobDetailContent>
							<LanguageImage
								src={languageImage}
								alt="dollar-img"
							/>
							<JobDetailvalue>
								{minimumEnglishProficiency}
							</JobDetailvalue>
						</JobDetailContent>
					</Col>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Turnos</JobDetailsTitle>
						<JobDetailContent>
							<LanguageImage src={shiftsImage} alt="dollar-img" />
							{props.shifts.map((shift, index) => {
								return (
									<ShiftContainer
										border={index < props.shifts.length - 1}
										key={index}
									>
										<JobShift
											startTime={shift.startTime}
											endTime={shift.endTime}
											startDay={shift.startDay}
											endDay={shift.endDay}
										/>
									</ShiftContainer>
								);
							})}
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
				<JobDetailsWrapper>
					<Col xs={12} md={12} className="details-container">
						<JobDetailsTitle>Ubicación</JobDetailsTitle>
						<LocationContainer>
							<JobDetailContainer>
								<LanguageImage
									src={cityImage}
									alt="dollar-img"
								/>
								<LanguageContentContainer border withImage>
									<LanguageTitle>Ciudad</LanguageTitle>
									<LanguageDescription>
										{props.locations[0].city}
									</LanguageDescription>
								</LanguageContentContainer>
							</JobDetailContainer>
							<JobDetailContainer>
								<LanguageImage
									src={industrialParkImage}
									alt="dollar-img"
								/>
								<LanguageContentContainer border withImage>
									<LanguageTitle>
										Parque Industrial
									</LanguageTitle>
									<LanguageDescription>
										{props.locations[0].industrialHub}
									</LanguageDescription>
								</LanguageContentContainer>
							</JobDetailContainer>
							<JobDetailContainer>
								<LanguageImage
									src={addressImage}
									alt="dollar-img"
								/>
								<LanguageContentContainer
									border={false}
									withImage
								>
									<LanguageTitle>Dirección</LanguageTitle>
									<LanguageDescription>
										{props.locations[0].address}
									</LanguageDescription>
								</LanguageContentContainer>
							</JobDetailContainer>
						</LocationContainer>
					</Col>
				</JobDetailsWrapper>
			</JobBasicDetails>
			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={descriptionImage} alt=""></img>
					<span>&nbsp;Descripción</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					<ReactMarkdown source={props.jobDescription} />
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<br />

			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={skillsImages} alt=""></img>
					<span>&nbsp;Habilidades Requeridas</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.skills.map((skill, i) => {
						return <DescriptionTag key={i}>{skill}</DescriptionTag>;
					})}
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<br />

			{props.certificatesAndLicences && (
				<JobRequirementWrapper>
					<JobRequirementTitle>
						<img src={certificateImage} alt=""></img>
						<span>&nbsp;Certificados y Licencias</span>
					</JobRequirementTitle>
					<JobRequirementDescription>
						{props.certificatesAndLicences.map((certificate, i) => {
							return (
								<DescriptionTag key={i}>
									{certificate}
								</DescriptionTag>
							);
						})}
					</JobRequirementDescription>
				</JobRequirementWrapper>
			)}
			<br />

			{/* <JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={certificateImage} alt=""></img>
					<span>&nbsp;Beneficios</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.benifits.map((v) => {
						return <DescriptionTag key={v}>{v}</DescriptionTag>;
					})}
				</JobRequirementDescription>
			</JobRequirementWrapper> */}
		</>
	);
};
export const JobPost = function JobPost(props: JobPostInterface): JSX.Element {
	return (
		<JobPostCard>
			<JobPostTitleRow {...props} />
			<JobContentWrapper {...props} />
		</JobPostCard>
	);
};
