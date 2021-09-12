import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "src/global-styles";
import FilterDropdown from "./FilterDropdown";
import { withStyles } from "@material-ui/core/styles";
import JobPosting from "src/components/jobs/job-posting";
import JobDetailModal from "src/components/jobs/JobDetailModal";

import PageWrapper from "src/components/page-wrapper";
import JobPostPreview from "../../components/jobs/JobPostPreview";
import { translations } from "src/translations";
import { forSize } from "src/responsive";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useShowJobsQuery } from "generated/graphql-operations";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import { validateSchema } from "graphql";
import { borderRadius } from "src/global-styles";

const T = translations.legacyTranslationsNeedsRefactor;

const PageStyling = styled.div`
	padding-top: 135px;
	padding-bottom: 30px;
	padding-right: 50px;
	padding-left: 50px;

	${forSize.tabletAndDown} {
		padding-right: 10px;
		padding-left: 10px;
	}
`;
const Banner = styled.div`
	height: 350px;
	border-radius: ${borderRadius.container};
	background-color: ${colors.secondaryColorGreen};
	padding: 20px;
	color: #fff;
	display: flex;
	flex-direction: column;
	position: relative;
`;
const BannerSection = styled.div`
	margin-top: 20px;
	margin-left: 5%;
`;
const BannerTitle = styled.div`
	font-size: 36px;
	margin: 20px 0px;
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
	${forSize.tabletLandscapeAndDown} {
		bottom: -150px;
	}
	${forSize.tabletAndDown} {
		top: 250px;
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
	margin-top: 100px;
	${forSize.tabletAndDown} {
		margin-top: 150px;
	}
	${forSize.tabletLandscapeAndDown} {
		margin-top: 200px;
	}
`;
export interface Shift {
	day: string;
	time: string;
}
export interface Ratings {
	average: number;
	overallSatisfaction: number;
	healthAndSafeety: number;
	workEnvironment: number;
	managerRelationships: number;
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
	// const { loading, error, data } = useShowJobsQuery();

	// if (loading) {
	// 	return (
	// 		<h2>
	// 			<T.jobsearch.loading />
	// 		</h2>
	// 	);
	// }

	// if (error) {
	// 	console.error(error);
	// 	return <h2>{`Error! ${error.message}`}</h2>;
	// }

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
	const [filters, updateFilters] = useState({
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
	});
	const updateFilterValue = (key: string, val: string) => {
		updateFilters({
			...filters,
			[key]: val,
		});
	};
	const filterMasters: any = {
		dayPosted: [
			{
				label: "Any Time",
				value: 1,
			},
			{
				label: "Past Month",
				value: 2,
			},
			{
				label: "Past Week",
				value: 3,
			},
			{
				label: "Past 24 Hours",
				value: 4,
			},
		],
		industrialPark: [
			{
				label: "El Florido",
				value: 1,
			},
			{
				label: "Otay",
				value: 2,
			},
			{
				label: "Luna Park",
				value: 3,
			},
		],
		shifts: [
			{
				label: "Morning",
				value: 1,
			},
			{
				label: "Mixed",
				value: 2,
			},
			{
				label: "Night",
				value: 3,
			},
		],
		jobTitles: [
			{
				label: "Operador",
				value: 1,
			},
			{
				label: "Ensamble",
				value: 2,
			},
		],
		jobTypes: [
			{
				label: "Full-time",
				value: 1,
			},
			{
				label: "Temporary",
				value: 2,
			},
			{
				label: "Part-time",
				value: 3,
			},
			{
				label: "Contractor",
				value: 4,
			},
			{
				label: "Internship",
				value: 5,
			},
		],
		industries: [
			{
				label: "Aerospace",
				value: 1,
			},
			{
				label: "Medical",
				value: 1,
			},
			{
				label: "Plastics",
				value: 1,
			},
		],
		skills: [
			{
				label: "Productos Medicos",
				value: 1,
			},
			{
				label: "Instrumentos de Medicion",
				value: 2,
			},
			{
				label: "Productos Aerospaciales",
				value: 3,
			},
			{
				label: "Productos Aerospaciales",
				value: 4,
			},
		],
		licences: [
			{
				label: "Montacargas",
				value: 1,
			},
			{
				label: "Máquinas de CAC",
				value: 2,
			},
			{
				label: "Máquinas de CAC",
				value: 3,
			},
		],
	};
	const camelcaseToLabel = (str: string): string => {
		return `${str.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")}`;
	};
	const getDisplayLabel = (fitlerKey: string): any => {
		if (typeof filters[fitlerKey] !== "object") {
			return filterMasters[fitlerKey].find((v) => {
				return v.value == filters[fitlerKey];
			}).label;
		} else {
			return (
				<LabelContainer>
					{" "}
					{filters[fitlerKey].length ? (
						filters[fitlerKey].length > 1 ? (
							<>
								{camelcaseToLabel(fitlerKey)}&nbsp;
								<Badge>{filters[fitlerKey].length}</Badge>
							</>
						) : (
							filterMasters[fitlerKey].find((v) => {
								return v.value == filters[fitlerKey];
							}).label
						)
					) : (
						camelcaseToLabel(fitlerKey)
					)}
				</LabelContainer>
			);
		}
	};
	const jobs: Array<JobPostInterface> = [
		{
			id: 1,
			company: "Foxconn",
			jobPost: "Operador de Producción",
			reviewCount: 32,
			rating: 3,
			companyLogo:
				"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
			published: "3 days ago",
			salaryRange: "$1.800 - $2.100 Pesos / Semana",
			jobType: "Proyecto (Temporal)",
			minEducation: "Preparatoria",
			englishProficiency: "Básico",
			industry: "Electrónica",
			shifts: [
				{ day: "lun - vie", time: "8 AM - 5 PM" },
				{ day: "lun - vie", time: "2 PM - 11 PM" },
				{ day: "mar - sab", time: "8 AM - 5 PM" },
			],
			city: "Tijuana",
			industrialPark: "El Lago",
			address: "Calle Lagua Maynar 5520, Section C",
			postedTimeAgo: "3 days ago",
			description:
				"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
			jobSkills: [
				"Maquinas Automatizadas",
				"Instrumentos de Medicion",
				"Uso de Computadora",
			],
			certifications: ["Instrumentos de Medicion", "Montacargas"],
			benifits: ["Seguro Social", "Seguro de Salud"],
			companyDetail: {
				description:
					"opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now",
				size: "2001-5000",
				industry: "Aerospace",
				companyWebsite: "https://facebook.com",
				location: [
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
				],
				ratings: {
					average: 5,
					overallSatisfaction: 4,
					healthAndSafeety: 3.5,
					workEnvironment: 4,
					managerRelationships: 3.86,
					benefits: 3.8,
				},
				recommendationPercenteage: 40,
				averageStay: 9,
				reviewCount: 3,
				reviews: [
					{
						reviewedBy: "Operator",
						title: "The Best",
						reviewedOn: "3 days ago",
						rating: {
							healthAndSafety: 4,
							managerRelationship: 4,
							workEnvironment: 4,
							benefits: 4,
							overallSatisfaction: 4,
						},
						pros: "containing Lorem Ipsum passages, and more recently with desktop",
						cons: "also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
						additionalComments:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
					},
				],
				salaries: [
					{
						position: "Operador",
						pay: 38,
						range: [38, 1500, 3000],
					},
				],
				jobs: [
					{
						id: 1,
						company: "Foxconn",
						jobPost: "Operador de Producción",
						reviewCount: 32,
						rating: 3,
						companyLogo:
							"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
						published: "3 days ago",
						salaryRange: "$1.800 - $2.100 Pesos / Semana",
						jobType: "Proyecto (Temporal)",
						minEducation: "Preparatoria",
						englishProficiency: "Básico",
						industry: "Electrónica",
						shifts: [
							{
								day: "lun - vie",
								time: "8 AM - 5 PM",
							},
							{
								day: "lun - vie",
								time: "2 PM - 11 PM",
							},
							{
								day: "mar - sab",
								time: "8 AM - 5 PM",
							},
						],
						city: "Tijuana",
						industrialPark: "El Lago",
						address: "Calle Lagua Maynar 5520, Section C",
						postedTimeAgo: "3 days ago",
						description:
							"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
					},
				],
			},
		},
		{
			id: 2,
			company: "Foxconn",
			jobPost: "Operador de Producción",
			reviewCount: 32,
			rating: 3,
			companyLogo:
				"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
			published: "3 days ago",
			salaryRange: "$1.800 - $2.100 Pesos / Semana",
			jobType: "Proyecto (Temporal)",
			minEducation: "Preparatoria",
			englishProficiency: "Básico",
			industry: "Electrónica",
			shifts: [
				{ day: "lun - vie", time: "8 AM - 5 PM" },
				{ day: "lun - vie", time: "2 PM - 11 PM" },
				{ day: "mar - sab", time: "8 AM - 5 PM" },
			],
			city: "Tijuana",
			industrialPark: "El Lago",
			address: "Calle Lagua Maynar 5520, Section C",
			postedTimeAgo: "3 days ago",
			description:
				"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
			jobSkills: [
				"Maquinas Automatizadas",
				"Instrumentos de Medicion",
				"Uso de Computadora",
			],
			certifications: ["Instrumentos de Medicion", "Montacargas"],
			benifits: ["Seguro Social", "Seguro de Salud"],
			companyDetail: {
				description:
					"opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now",
				size: "2001-5000",
				industry: "Aerospace",
				companyWebsite: "https://facebook.com",
				location: [
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
				],
				ratings: {
					average: 5,
					overallSatisfaction: 4,
					healthAndSafeety: 3.5,
					workEnvironment: 4,
					managerRelationships: 3.86,
					benefits: 3.8,
				},
				recommendationPercenteage: 40,
				averageStay: 9,
				reviewCount: 3,
				reviews: [
					{
						reviewedBy: "Operator",
						reviewedOn: "3 days ago",
						rating: 5,
						pros: "containing Lorem Ipsum passages, and more recently with desktop",
						cons: "also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
						additionalComments:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
					},
				],
				salaries: [
					{
						position: "Operador",
						pay: 38,
						range: [38, 1500, 3000],
					},
				],
				jobs: [
					{
						id: 1,
						company: "Foxconn",
						jobPost: "Operador de Producción",
						reviewCount: 32,
						rating: 3,
						companyLogo:
							"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
						published: "3 days ago",
						salaryRange: "$1.800 - $2.100 Pesos / Semana",
						jobType: "Proyecto (Temporal)",
						minEducation: "Preparatoria",
						englishProficiency: "Básico",
						industry: "Electrónica",
						shifts: [
							{
								day: "lun - vie",
								time: "8 AM - 5 PM",
							},
							{
								day: "lun - vie",
								time: "2 PM - 11 PM",
							},
							{
								day: "mar - sab",
								time: "8 AM - 5 PM",
							},
						],
						city: "Tijuana",
						industrialPark: "El Lago",
						address: "Calle Lagua Maynar 5520, Section C",
						postedTimeAgo: "3 days ago",
						description:
							"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
					},
				],
			},
		},
		{
			id: 3,
			company: "Foxconn",
			jobPost: "Operador de Producción",
			reviewCount: 32,
			rating: 3,
			companyLogo:
				"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
			published: "3 days ago",
			salaryRange: "$1.800 - $2.100 Pesos / Semana",
			jobType: "Proyecto (Temporal)",
			minEducation: "Preparatoria",
			englishProficiency: "Básico",
			industry: "Electrónica",
			shifts: [
				{ day: "lun - vie", time: "8 AM - 5 PM" },
				{ day: "lun - vie", time: "2 PM - 11 PM" },
				{ day: "mar - sab", time: "8 AM - 5 PM" },
			],
			city: "Tijuana",
			industrialPark: "El Lago",
			address: "Calle Lagua Maynar 5520, Section C",
			postedTimeAgo: "3 days ago",
			description:
				"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
			jobSkills: [
				"Maquinas Automatizadas",
				"Instrumentos de Medicion",
				"Uso de Computadora",
			],
			certifications: ["Instrumentos de Medicion", "Montacargas"],
			benifits: ["Seguro Social", "Seguro de Salud"],
			companyDetail: {
				description:
					"opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now",
				size: "2001-5000",
				industry: "Aerospace",
				companyWebsite: "https://facebook.com",
				location: [
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
				],
				ratings: {
					average: 5,
					overallSatisfaction: 4,
					healthAndSafeety: 3.5,
					workEnvironment: 4,
					managerRelationships: 3.86,
					benefits: 3.8,
				},
				recommendationPercenteage: 40,
				averageStay: 9,
				reviewCount: 3,
				reviews: [
					{
						reviewedBy: "Operator",
						reviewedOn: "3 days ago",
						rating: 5,
						pros: "containing Lorem Ipsum passages, and more recently with desktop",
						cons: "also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
						additionalComments:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
					},
				],
				salaries: [
					{
						position: "Operador",
						pay: 38,
						range: [38, 1500, 3000],
					},
				],
				jobs: [
					{
						id: 1,
						company: "Foxconn",
						jobPost: "Operador de Producción",
						reviewCount: 32,
						rating: 3,
						companyLogo:
							"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
						published: "3 days ago",
						salaryRange: "$1.800 - $2.100 Pesos / Semana",
						jobType: "Proyecto (Temporal)",
						minEducation: "Preparatoria",
						englishProficiency: "Básico",
						industry: "Electrónica",
						shifts: [
							{
								day: "lun - vie",
								time: "8 AM - 5 PM",
							},
							{
								day: "lun - vie",
								time: "2 PM - 11 PM",
							},
							{
								day: "mar - sab",
								time: "8 AM - 5 PM",
							},
						],
						city: "Tijuana",
						industrialPark: "El Lago",
						address: "Calle Lagua Maynar 5520, Section C",
						postedTimeAgo: "3 days ago",
						description:
							"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
					},
				],
			},
		},
		{
			id: 4,
			company: "Foxconn",
			jobPost: "Operador de Producción",
			reviewCount: 32,
			rating: 3,
			companyLogo:
				"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
			published: "3 days ago",
			salaryRange: "$1.800 - $2.100 Pesos / Semana",
			jobType: "Proyecto (Temporal)",
			minEducation: "Preparatoria",
			englishProficiency: "Básico",
			industry: "Electrónica",
			shifts: [
				{ day: "lun - vie", time: "8 AM - 5 PM" },
				{ day: "lun - vie", time: "2 PM - 11 PM" },
				{ day: "mar - sab", time: "8 AM - 5 PM" },
			],
			city: "Tijuana",
			industrialPark: "El Lago",
			address: "Calle Lagua Maynar 5520, Section C",
			postedTimeAgo: "3 days ago",
			description:
				"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
			jobSkills: [
				"Maquinas Automatizadas",
				"Instrumentos de Medicion",
				"Uso de Computadora",
			],
			certifications: ["Instrumentos de Medicion", "Montacargas"],
			benifits: ["Seguro Social", "Seguro de Salud"],
			companyDetail: {
				description:
					"opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now",
				size: "2001-5000",
				industry: "Aerospace",
				companyWebsite: "https://facebook.com",
				location: [
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
					"Calle Laguna Maynar 5520, Section C, Tijuana, EL Logo",
				],
				ratings: {
					average: 5,
					overallSatisfaction: 4,
					healthAndSafeety: 3.5,
					workEnvironment: 4,
					managerRelationships: 3.86,
					benefits: 3.8,
				},
				recommendationPercenteage: 40,
				averageStay: 9,
				reviewCount: 3,
				reviews: [
					{
						reviewedBy: "Operator",
						reviewedOn: "3 days ago",
						rating: 5,
						pros: "containing Lorem Ipsum passages, and more recently with desktop",
						cons: "also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
						additionalComments:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
					},
				],
				salaries: [
					{
						position: "Operador",
						pay: 38,
						range: [38, 1500, 3000],
					},
				],
				jobs: [
					{
						id: 1,
						company: "Foxconn",
						jobPost: "Operador de Producción",
						reviewCount: 32,
						rating: 3,
						companyLogo:
							"https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Facebook-512.png",
						published: "3 days ago",
						salaryRange: "$1.800 - $2.100 Pesos / Semana",
						jobType: "Proyecto (Temporal)",
						minEducation: "Preparatoria",
						englishProficiency: "Básico",
						industry: "Electrónica",
						shifts: [
							{
								day: "lun - vie",
								time: "8 AM - 5 PM",
							},
							{
								day: "lun - vie",
								time: "2 PM - 11 PM",
							},
							{
								day: "mar - sab",
								time: "8 AM - 5 PM",
							},
						],
						city: "Tijuana",
						industrialPark: "El Lago",
						address: "Calle Lagua Maynar 5520, Section C",
						postedTimeAgo: "3 days ago",
						description:
							"En este empleo, vas a realizar el correcto ensamble del producto cumpliendo con los requerimientos necesarios con el objetivo de asegurar la calidad del producto.",
					},
				],
			},
		},
	];
	const [mobileFilterModal, setMobileFilterModal] = useState({
		visible: false,
	});
	const [jobPostModal, setJobPostModal] = useState({
		visible: false,
		jobPost: null,
	});
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
							<BannerTitle>
								Find a Great Job in&nbsp;
								<BannerVizeContent>
									Tijuana
									<VizeBackgroundEffect />
								</BannerVizeContent>
							</BannerTitle>
							<BannerSubtitle>
								6 Employment Offer(s) Available
							</BannerSubtitle>
						</BannerSection>
						<SearchBar>
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
							{!isMobile ? (
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
												updateFilterValue("shift", v)
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
											value={filters.jobTypes}
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
									</FilterWrapper>
									<Button className="clear-btn">
										Clear All
									</Button>
								</Filters>
							) : (
								<Filters>
									<FilterOpenIcon>
										Filters{" "}
										<FilterListIcon
											onClick={() =>
												setMobileFilterModal({
													visible: true,
												})
											}
										/>
									</FilterOpenIcon>
								</Filters>
							)}
						</SearchBar>
					</Banner>
					<JobListWrapper>
						<Row>
							{jobs && jobs.length
								? jobs.map((job) => {
										return (
											<Col
												xs={12}
												sm={6}
												md={4}
												key={job.id}
											>
												<JobPostPreview
													job={job}
													openJobDetail={
														setJobPostModal
													}
												/>
											</Col>
										);
								  })
								: null}
						</Row>
					</JobListWrapper>
				</PageStyling>
				{jobPostModal.visible ? (
					<JobDetailModal
						visible={jobPostModal.visible}
						jobPost={jobPostModal.jobPost}
						onClose={() => {
							setJobPostModal({ visible: false, jobPost: null });
						}}
					/>
				) : null}
			</div>
		</PageWrapper>
	);
}
