import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { forSize } from "src/responsive";
import { Button } from "src/components/button";
import ReplyIcon from "@material-ui/icons/Reply";
import * as urlGenerators from "src/pages/url-generators";
import RatingsDropdown from "../../components/ratings-dropdown";
import { JobPostInterface } from "./for-employers";
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
import { colors, borderRadius, boxShadow } from "src/global-styles";
import foxconnLogoImage from "../../images/foxconnLogo.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";

const JobPostCard = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
	background: #fff;
	border-radius: ${borderRadius.container};
	padding: 20px;
	box-shadow: ${boxShadow.wide};
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
	margin-top: 20px;
`;
const JobPostTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostImage = styled.img`
	height: 68px;
	width: 68px;
	border-radius: ${borderRadius.smallImage};
	margin: 20px 20px 20px 0px;
`;
const PostHeaderContent = styled.div``;
const PostTitle = styled.div`
	color: black;
	font-size: 13px;
`;
const ReviewCount = styled.div`
	color: black;
	font-size: 13px;
	margin-left: 5px;
`;
const PostSubHeading = styled.div`
	font-weight: 700;
	font-size: 18px;
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
	align-items: end;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
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
	justify-content: space-around;
	align-items: center;
	width: 100%;
`;
const ReplyIconWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	svg {
		transform: scale(-1, 1);
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
export const JobPostTitleRow = function (props: JobPostInterface): JSX.Element {
	return (
		<JobPostTitle>
			<JobPostHeaderRightSection>
				<PostImage src={foxconnLogoImage} alt="post-image" />
				<PostHeaderContent>
					<PostTitle>{props.company}</PostTitle>
					<PostSubHeading>{props.jobPost}</PostSubHeading>
					<RatingWrapper>
						<RatingsDropdown
							ratings={{
								healthAndSafety: props.rating,
								managerRelationship: props.rating,
								workEnvironment: props.rating,
								benefits: props.rating,
								overallSatisfaction: props.rating,
							}}
							numReviews={props.reviewCount}
							companyName=""
						/>
						<ReviewCount>{props.reviewCount} Reviews</ReviewCount>
					</RatingWrapper>
				</PostHeaderContent>
			</JobPostHeaderRightSection>
			{props.modal ? (
				<JobPostHeaderLeftSection>
					<ActionsWrapper>
						<Button>
							<ReplyIconWrapper>
								<ReplyIcon />
								<span>Compartir</span>
							</ReplyIconWrapper>
						</Button>
						<Button $primary>Postularme</Button>
						<CloseButton>
							<CloseIcon onClick={props.onClose} />
						</CloseButton>
					</ActionsWrapper>
					<span>Posted {props.published}</span>
				</JobPostHeaderLeftSection>
			) : null}
		</JobPostTitle>
	);
};
export const JobContentWrapper = function (
	props: JobPostInterface
): JSX.Element {
	return (
		<>
			<JobBasicDetails>
				<JobDetailsWrapper>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Salario</JobDetailsTitle>
						<JobDetailContent>
							<img src={dollarImage} alt="dollar-img" />
							<JobDetailvalue>{props.salaryRange}</JobDetailvalue>
						</JobDetailContent>
					</Col>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Tipo de Contrato</JobDetailsTitle>
						<JobDetailContent>
							<img src={jobTypeImage} alt="dollar-img" />
							<JobDetailvalue>{props.jobType}</JobDetailvalue>
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
				<JobDetailsWrapper>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Educación Minima</JobDetailsTitle>
						<JobDetailContent>
							<img src={minEducationImage} alt="dollar-img" />
							<JobDetailvalue>
								{props.minEducation}
							</JobDetailvalue>
						</JobDetailContent>
					</Col>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Industria</JobDetailsTitle>
						<JobDetailContent>
							<img src={industryImage} alt="dollar-img" />
							<JobDetailvalue>{props.industry}</JobDetailvalue>
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
								{props.englishProficiency}
							</JobDetailvalue>
						</JobDetailContent>
					</Col>
					<Col xs={12} md={6} className="details-container">
						<JobDetailsTitle>Turnos</JobDetailsTitle>
						<JobDetailContent>
							<LanguageImage src={shiftsImage} alt="dollar-img" />
							{props.shifts.map((v, index) => {
								return (
									<LanguageContentContainer
										border={
											index !== props.shifts.length - 1
										}
										key={index}
									>
										<LanguageTitle>{v.day}</LanguageTitle>
										<LanguageDescription>
											{v.time}
										</LanguageDescription>
									</LanguageContentContainer>
								);
							})}
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
				<JobDetailsWrapper>
					<Col xs={12} md={12} className="details-container">
						<JobDetailsTitle>Ubicación</JobDetailsTitle>
						<JobDetailContent>
							<JobDetailContainer>
								<LanguageImage
									src={cityImage}
									alt="dollar-img"
								/>
								<LanguageContentContainer border withImage>
									<LanguageTitle>Ciudad</LanguageTitle>
									<LanguageDescription>
										{props.city}
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
										{props.industrialPark}
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
										{props.address}
									</LanguageDescription>
								</LanguageContentContainer>
							</JobDetailContainer>
						</JobDetailContent>
					</Col>
				</JobDetailsWrapper>
			</JobBasicDetails>
			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={descriptionImage} alt=""></img>
					<span>&nbsp;Descripción</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.description}
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<br />

			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={skillsImages} alt=""></img>
					<span>&nbsp;Habilidades Requeridas</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.jobSkills.map((v) => {
						return <DescriptionTag key={v}>{v}</DescriptionTag>;
					})}
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<br />

			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={certificateImage} alt=""></img>
					<span>&nbsp;Certificados y Licencias</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.certifications.map((v) => {
						return <DescriptionTag key={v}>{v}</DescriptionTag>;
					})}
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<br />

			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={certificateImage} alt=""></img>
					<span>&nbsp;Beneficios</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					{props.benifits.map((v) => {
						return <DescriptionTag key={v}>{v}</DescriptionTag>;
					})}
				</JobRequirementDescription>
			</JobRequirementWrapper>
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
