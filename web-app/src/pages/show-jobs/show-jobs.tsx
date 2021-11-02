import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "src/global-styles";
import FilterDropdown from "./filter-dropdown";
import { withStyles } from "@material-ui/core/styles";

import PageWrapper from "src/components/page-wrapper";
import JobPostPreview from "../../components/jobs/job-post-preview";
import { translations } from "src/translations";
import { forSize } from "src/responsive";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useShowJobsQuery } from "generated/graphql-operations";
import TextField from "@material-ui/core/TextField";
import JobListBannerImage from "../../images/job-list-banner-image.png";
import ManJobSearchingImage from "../../images/ManJobSearching.png";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { borderRadius } from "src/global-styles";

const T = translations.legacyTranslationsNeedsRefactor;

const PageStyling = styled.div`
	padding-top: 135px;
	padding-bottom: 30px;
	padding-right: 50px;
	padding-left: 50px;
	max-width: 1500px;
	margin: 0 auto;

	${forSize.tabletAndDown} {
		padding-top: 50px;
		padding-right: 0px;
		padding-left: 0px;
	}
`;
const Banner = styled.div`
	height: 240px;
	border-radius: ${borderRadius.container};
	background-color: ${colors.secondaryColorGreen};
	padding: 20px;
	color: #fff;
	display: flex;
	flex-direction: column;
	position: relative;
	${forSize.tabletAndDown} {
		border-radius: 0px;
	}
`;
const BannerSection = styled.div`
	margin-top: 20px;
	margin-left: 5%;
	margin-right: 5%;
	display: flex;
	justify-content: space-between;
	${forSize.tabletAndDown} {
		flex-direction: column;
	}
`;
const BannerTextContainer = styled.div``;
const BannerImage = styled.img`
	height: 175px;
	width: auto;
	${forSize.tabletAndDown} {
		display: none;
	}
`;

const BannerTitle = styled.div`
	font-size: 36px;
	margin: 20px 0px;

	${forSize.tabletAndDown} {
		font-size: 26px;
	}
`;
const BannerVizeContent = styled.span`
	position: relative;
	z-index: 1;
`;
const VizeBackgroundEffect = styled.div`
	background-color: #6abaf5;
	top: 28px;
	left: 0px;
	position: absolute;
	height: 12px;
	width: 100%;
	z-index: -1;
	${forSize.tabletAndDown} {
		top: 33px;
		height: 6px;
	}
`;
const BannerSubtitle = styled.div`
	font-size: 18px;
`;
const SearchBar = styled.div`
	position: absolute;
	margin: 0 5%;
	// height: 200px;
	width: 87%;
	bottom: -76px;
	background: #fff;
	border-radius: ${borderRadius.container};
	${forSize.tabletAndDown} {
		bottom: -42px;
		top: 250px;
		width: 100%;
		margin: 0;
		left: 0;
	}
`;
const SearchInput = styled.div`
	height: 75px;
	border-radius: 16px 16px 0px 0px;
	background: #eaf7ff;
	display: flex;

	input {
		flex-grow: 1;
		border: none;
		background: #eaf7ff;
		color: black;
		${forSize.tabletAndDown} {
			width: 20%;
		}
	}
	input:focus {
		outline: none;
	}
`;
const SearchBarIcon = styled.div`
	display: flex;
	align-items: center;
	svg {
		width: 110px;
		color: ${colors.secondaryColorGreen};
		font-size: 36px;
	}
	${forSize.tabletAndDown} {
		svg {
			width: 75px;
			font-size: 26px;
		}
	}
	${forSize.phoneOnly} {
		svg {
			width: 50px;
			font-size: 18px;
		}
	}
`;
const SearchButton = styled.button`
	background: ${colors.primaryColorBlue};
	width: 150px;
	border-radius: 0 16px 0px 0px;
	${forSize.tabletAndDown} {
		width: 75px;
	}
`;
const Filters = styled.div`
	display: flex;
	// height:125px;
	height: 100%;
	justify-content: space-between;
	padding: 5px;
	.clear-btn {
		width: 230px;
	}
	svg {
		color: black;
	}
	${forSize.tabletAndDown} {
		height: 80px;
	}
`;
const FilterOpenIcon = styled.span`
	color: black;
`;
const FilterWrapper = styled.div`
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
	align-items: center;
	margin: 20px;
	${forSize.tabletAndDown} {
		overflow: auto;
		display: block;
		white-space: nowrap;
		margin: 5px;
	}
`;
const Badge = styled.div`
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: white;
	color: black;
	margin-left: 10px;
`;
const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ResetAllButton = styled.button`
	color: #000000;
`;

const CssTextField = withStyles({
	root: {
		"margin-bottom": "10px",
		"margin-right": "8px",
		"& label.Mui-focused": {
			color: colors.secondaryColorGreen,
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "grey",
		},
	},
})(TextField);
const JobListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
	margin-right: 10px;
	margin-left: 10px;

	${forSize.tabletAndDown} {
		margin-top: 10px;
	}
`;

let initialValuesForFilter = {
	dayPosted: 1,
	industrialPark: [],
	shifts: [],
	jobTitles: [],
	jobTypes: [],
	industries: [],
	skills: [],
	licences: [],
	minSalary: 0,
	maxSalary: 0,
};

export interface Shift {
	day: string;
	time: string;
}
export interface Ratings {
	average: number;
	overallSatisfaction: number;
	healthAndSafety: number;
	workEnvironment: number;
	managerRelationship: number;
	benefits: number;
}

export interface Review {
	reviewedBy: string;
	reviewedOn: string;
	title: string;
	rating: Ratings;
	pros: string;
	cons: string;
	additionalComments: string;
	recommended: boolean;
}

export interface Salary {
	position: string;
	pay: number;
	range: number[];
}
export interface Company {
	description: string;
	size: string;
	industry: string;
	companyWebsite: string;
	location: string[];
	ratings: Ratings;
	recommendationPercenteage: number;
	averageStay: number;
	reviewCount: number;
	reviews: Review[];
	salaries: Salary[];
	jobs: JobPostInterface[];
}
export interface JobPostInterface {
	id: number;
	company: string;
	jobPost: string;
	reviewCount: number;
	rating: number;
	published: string;
	salaryRange: string;
	jobType: string;
	minEducation: string;
	industry: string;
	companyLogo: string;
	shifts: Shift[];
	city: string;
	industrialPark: string;
	address: string;
	postedTimeAgo: string;
	description: string;
	jobSkills?: string[];
	certifications?: string[];
	benifits?: string[];
	englishProficiency?: string;
	companyDetail?: Company;
}
export default function ShowJobs(): JSX.Element {
	const [filters, updateFilters] = useState({ ...initialValuesForFilter });
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const { loading, error, data } = useShowJobsQuery();

	if (loading) {
		return (
			<h2>
				<T.jobsearch.loading />
			</h2>
		);
	}

	if (error) {
		console.error(error);
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	const jobsData = data?.searchJobAds.nodes;

	console.log("data", jobsData);

	// const RenderedItems = data.searchJobAds.nodes.map(function (jobad) {
	// 	return <JobPosting key={jobad.id} job={jobad} />;
	// });

	// let message;
	// if (RenderedItems.length < 1) {
	// 	message = (
	// 		<h2>
	// 			<T.jobsearch.nojobs />
	// 		</h2>
	// 	);
	// } else {
	// 	message = "";
	// }
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	// const updateFilterValue = (key: string, val: string) => {
	// 	updateFilters({
	// 		...filters,
	// 		[key]: val,
	// 	});
	// };

	// const camelcaseToLabel = (str: string): string => {
	// 	return `${str.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")}`;
	// };
	// const getDisplayLabel = (fitlerKey: string): any => {
	// 	if (typeof filters[fitlerKey] !== "object") {
	// 		return filterMasters[fitlerKey].find((v) => {
	// 			return v.value == filters[fitlerKey];
	// 		}).label;
	// 	} else {
	// 		return (
	// 			<LabelContainer>
	// 				{" "}
	// 				{filters[fitlerKey].length ? (
	// 					filters[fitlerKey].length > 1 ? (
	// 						<>
	// 							{camelcaseToLabel(fitlerKey)}&nbsp;
	// 							<Badge>{filters[fitlerKey].length}</Badge>
	// 						</>
	// 					) : (
	// 						filterMasters[fitlerKey].find((v) => {
	// 							return v.value == filters[fitlerKey];
	// 						}).label
	// 					)
	// 				) : (
	// 					camelcaseToLabel(fitlerKey)
	// 				)}
	// 			</LabelContainer>
	// 		);
	// 	}
	// };

	// const clearAllFilter = () => {
	// 	updateFilters({ ...initialValuesForFilter });
	// };
	const isMobile: boolean = width <= 768;
	return (
		<PageWrapper title="Trabajos - Vize">
			<div id="job-list">
				<PageStyling>
					{/* <h2>
					{data.searchJobAds.nodes.length}{" "}
					<T.jobsearch.jobsAvailable />
				</h2>
				{message}
				{RenderedItems} */}
					<Banner>
						<BannerSection>
							<BannerTextContainer>
								<BannerTitle>
									Encuentra el mejor empleo para ti en&nbsp;
									<BannerVizeContent>
										Tijuana
										<VizeBackgroundEffect />
									</BannerVizeContent>
								</BannerTitle>
								<BannerSubtitle>
									{jobsData && jobsData.length} Vacante
									{jobsData &&
										jobsData.length > 1 &&
										"s"}{" "}
									Disponible
									{jobsData && jobsData.length > 1 && "s"}
								</BannerSubtitle>
							</BannerTextContainer>
							<BannerImage
								src={ManJobSearchingImage}
							></BannerImage>
						</BannerSection>
					</Banner>
					<JobListWrapper>
						{jobsData && jobsData.length
							? jobsData.map((job, i) => {
									if (!job.isArchived) {
										return (
											<JobPostPreview job={job} key={i} />
										);
									}
							  })
							: null}
					</JobListWrapper>
				</PageStyling>
			</div>
		</PageWrapper>
	);
}

// const filterMasters: any = {
// 	dayPosted: [
// 		{
// 			label: "Any Time",
// 			value: 1,
// 		},
// 		{
// 			label: "Past Month",
// 			value: 2,
// 		},
// 		{
// 			label: "Past Week",
// 			value: 3,
// 		},
// 		{
// 			label: "Past 24 Hours",
// 			value: 4,
// 		},
// 	],
// 	industrialPark: [
// 		{
// 			label: "El Florido",
// 			value: 1,
// 		},
// 		{
// 			label: "Otay",
// 			value: 2,
// 		},
// 		{
// 			label: "Luna Park",
// 			value: 3,
// 		},
// 	],
// 	shifts: [
// 		{
// 			label: "Morning",
// 			value: 1,
// 		},
// 		{
// 			label: "Mixed",
// 			value: 2,
// 		},
// 	],
// 	jobTitles: [
// 		{
// 			label: "Operador",
// 			value: 1,
// 		},
// 		{
// 			label: "Ensamble",
// 			value: 2,
// 		},
// 	],
// 	jobTypes: [
// 		{
// 			label: "Full-time",
// 			value: 1,
// 		},
// 		{
// 			label: "Temporary",
// 			value: 2,
// 		},
// 		{
// 			label: "Part-time",
// 			value: 3,
// 		},
// 		{
// 			label: "Contractor",
// 			value: 4,
// 		},
// 		{
// 			label: "Internship",
// 			value: 5,
// 		},
// 	],
// 	industries: [
// 		{
// 			label: "Aerospace",
// 			value: 1,
// 		},
// 		{
// 			label: "Medical",
// 			value: 2,
// 		},
// 		{
// 			label: "Plastics",
// 			value: 3,
// 		},
// 	],
// 	skills: [
// 		{
// 			label: "Productos Medicos",
// 			value: 1,
// 		},
// 		{
// 			label: "Instrumentos de Medicion",
// 			value: 2,
// 		},
// 		{
// 			label: "Productos Aerospaciales",
// 			value: 3,
// 		},
// 		{
// 			label: "Productos Aerospaciales",
// 			value: 4,
// 		},
// 	],
// 	licences: [
// 		{
// 			label: "Montacargas",
// 			value: 1,
// 		},
// 		{
// 			label: "Máquinas de CAC",
// 			value: 2,
// 		},
// 		{
// 			label: "Máquinas de CAC",
// 			value: 3,
// 		},
// 	],
// };

{
	/* <SearchBar>
							<SearchInput>
								<SearchBarIcon>
									<SearchIcon></SearchIcon>
								</SearchBarIcon>
								<input
									name="search"
									placeholder="Search by job title, skill, company, or more"
								></input>
								<SearchButton id="">Search</SearchButton>
							</SearchInput>
							<Filters>
								<FilterWrapper>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"dayPosted"
										)}
										options={filterMasters.dayPosted}
										value={filters.dayPosted}
										updateValue={(v) =>
											updateFilterValue(
												"dayPosted",
												v
											)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"industrialPark"
										)}
										options={
											filterMasters.industrialPark
										}
										value={filters.industrialPark}
										updateValue={(v) =>
											updateFilterValue(
												"industrialPark",
												v
											)
										}
									></FilterDropdown>
									<CssTextField
										label="Min Salary"
										placeholder="e.g. 2000"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<AttachMoneyIcon />
												</InputAdornment>
											),
										}}
									/>
									<CssTextField
										label="Max Salary"
										placeholder="e.g. 2200"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<AttachMoneyIcon />
												</InputAdornment>
											),
										}}
									/>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"shifts"
										)}
										options={filterMasters.shifts}
										value={filters.shifts}
										updateValue={(v) =>
											updateFilterValue("shifts", v)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"jobTitles"
										)}
										options={filterMasters.jobTitles}
										value={filters.jobTitles}
										updateValue={(v) =>
											updateFilterValue(
												"jobTitles",
												v
											)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"jobTypes"
										)}
										options={filterMasters.jobTypes}
										value={filters.jobTypes}
										updateValue={(v) =>
											updateFilterValue("jobTypes", v)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"industries"
										)}
										options={filterMasters.industries}
										value={filters.industries}
										updateValue={(v) =>
											updateFilterValue(
												"industries",
												v
											)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"skills"
										)}
										options={filterMasters.skills}
										value={filters.skills}
										updateValue={(v) =>
											updateFilterValue("skills", v)
										}
									></FilterDropdown>
									<FilterDropdown
										displayLabel={getDisplayLabel(
											"licences"
										)}
										options={filterMasters.licences}
										value={filters.licences}
										updateValue={(v) =>
											updateFilterValue("licences", v)
										}
									></FilterDropdown>
									{isMobile ? <ResetAllButton onClick={clearAllFilter} >Reset All</ResetAllButton> : null}
								</FilterWrapper>
								{!isMobile ? <Button className="clear-btn" onClick={clearAllFilter}>
									Clear All
								</Button> : null}
							</Filters>
						</SearchBar>
						 */
}
