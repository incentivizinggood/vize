import React from "react";
import styled from "styled-components";

import { i18n } from "meteor/universe:i18n";

import PageWrapper from "imports/ui/components/page-wrapper";
import Banner from "imports/ui/components/banner";
import I18nImg from "imports/ui/components/i18n-img";
import { LinkButton } from "imports/ui/components/button";
import { forSize } from "imports/ui/responsive.js";

const t = i18n.createTranslator("common.forEmployers");
const T = i18n.createComponent(t);

const horizontalPaddingVal = "15px";

const P = styled.p`
	color: ${props => props.theme.main};
	text-align: center;
	font-size: 30px;

	${forSize.tabletAndDown} {
		padding-left: ${horizontalPaddingVal};
		padding-right: ${horizontalPaddingVal};
	}
`;

const Bold = styled.span`
	font-weight: bold;
`;

const ProblemPoint = styled.p`
	display: block;

	max-width: 600px;
	padding: 70px;
	margin-left: auto;
	margin-right: auto;

	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	background-color: white;
	color: ${props => props.theme.main};
	text-align: center;
	font-size: 30px;

	& + & {
		margin-top: 150px;
	}

	${forSize.phoneOnly} {
		padding: 30px;
		width: 90%;
	}
`;

const SectionTitle = styled.h1`
	color: ${props => props.theme.main};
	padding: 30px 0;
	text-align: center;
	font-weight: bold;
	font-size: 65px;

	${forSize.tabletLandscapeAndDown} {
		font-size: 50px;
	}
`;

const SubsectionTitle = styled.h2`
	color: ${props => props.theme.main};
	text-align: center;
	font-weight: bold;
	font-size: 36px;
`;

const SectionContainer = styled.section`
	padding-top: 60px;
	padding-bottom: 60px;
`;

const GetStarted = props => (
	<LinkButton primary to="/register" {...props}>
		<T>getStarted</T>
	</LinkButton>
);

const GetStartedMedium = styled(GetStarted)`
	font-size: 30px;
`;

const GetStartedLarge = styled(GetStarted)`
	font-size: 35px;
	padding: 1.3rem 4rem !important;
`;

const PlanBox = styled.div`
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	background-color: white;
	color: ${props => props.theme.main};
	margin: 10px;
	width: 30rem;
	padding: calc(3rem - 20px) 2rem;
	text-align: center;
	font-weight: bolder;

	display: flex;
	flex-direction: column;
	> * {
		margin: 20px 0;
	}

	${forSize.phoneOnly} {
		width: 85%;
	}
`;

const PlanFeatureList = styled.ul`
	list-style-type: none;
	line-height: 1.5;
	font-size: 18px;
	text-align: left;
	padding-left: 8px;

	li:before {
		content: "✓  ";
	}

	li {
		margin-bottom: 15px;
	}

	/* Push the "Get Started" button to the bottom */
	flex: 1;
`;

const PlanName = styled.h1`
	font-weight: bold;
`;

interface PlanOptionProps {
	name: React.ReactNode;
	items: React.ReactNode[];
}

const PlanOption = ({ name, items }: PlanOptionProps) => (
	<PlanBox>
		<PlanName>{name}</PlanName>
		<PlanFeatureList>
			{items.map(item => (
				<li>{item}</li>
			))}
		</PlanFeatureList>
		<GetStartedMedium />
	</PlanBox>
);

const PlansContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 150px;

	> * {
		margin: 30px;
		min-height: 450px; // so that boxes are the same height for mobile screen size
	}

	${forSize.tabletAndDown} {
		flex-direction: column;
		align-items: center;
	}
`;

const PageTitle = styled.h1`
	display: block;
	margin-bottom: 40px;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;

	font-size: 3em;
	line-height: 1.2em;
	font-weight: 700;
	color: white;

	${forSize.tabletAndDown} {
		padding-left: ${horizontalPaddingVal};
		padding-right: ${horizontalPaddingVal};
	}
`;

const SolutionContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 80px;
	> div {
		margin-bottom: 24px;
		max-width: 879px;
	}
`;

const PricingTextContainer = styled(P)`
	max-width: 620px;
	margin-left: auto;
	margin-right: auto;
`;

function ForEmployers() {
	return (
		<PageWrapper title="Employers" navIsAnimated>
			<Banner>
				<PageTitle>
					<T>headerText</T>
				</PageTitle>
				<GetStartedLarge />
			</Banner>
			<SectionContainer style={{ backgroundColor: "whitesmoke" }}>
				<SectionTitle>
					<T>heading1</T>
				</SectionTitle>

				<ProblemPoint>
					<T>card1part1</T> <Bold>90% - 120%</Bold>
					<T>card1part2</T>{" "}
					<Bold>
						<T>card1part3</T>
					</Bold>
				</ProblemPoint>

				<ProblemPoint>
					<T>card2part1</T>{" "}
					<Bold>
						<T>card2part2</T>
					</Bold>
				</ProblemPoint>
				<ProblemPoint>
					<T>card3part1</T>{" "}
					<Bold>
						<T>card3part2</T>
					</Bold>
				</ProblemPoint>
			</SectionContainer>

			<SectionContainer>
				<SectionTitle>
					<T>heading2</T>
				</SectionTitle>
				<SolutionContainer>
					<div>
						<SubsectionTitle>
							<T>recruitingHeading</T>
						</SubsectionTitle>
						<P>
							<T>recruitingText</T>
						</P>
					</div>
					<I18nImg
						className="img-responsive"
						src={l => `/images/example-job-post-square-${l}.png`}
					/>
				</SolutionContainer>
				<SolutionContainer>
					<div>
						<SubsectionTitle>
							<T>retainmentHeading</T>
						</SubsectionTitle>
						<P>
							<T>retainmentText</T>
						</P>
					</div>
					<I18nImg
						className="img-responsive"
						src={l => `/images/analytics-dashboard-${l}.png`}
					/>
				</SolutionContainer>
			</SectionContainer>

			<SectionContainer style={{ backgroundColor: "whitesmoke" }}>
				<SectionTitle>
					<T>heading3</T>
				</SectionTitle>
				<PricingTextContainer>
					<T>pricingText1</T>{" "}
					<Bold>
						<T>pricingText2</T>
					</Bold>{" "}
					<T>pricingText3</T>{" "}
					<Bold>
						<T>pricingText4</T>
					</Bold>{" "}
					<T>pricingText5</T>
				</PricingTextContainer>
				<br />
				<PlansContainer>
					<PlanOption
						name={<T>businessHeading</T>}
						items={[
							<T>businessText1</T>,
							<T>businessText2</T>,
							<T>businessText3</T>,
						]}
					/>
					<PlanOption
						name={<T>premiumHeading</T>}
						items={[
							<T>premiumText1</T>,
							<T>premiumText2</T>,
							<T>premiumText3</T>,
							<T>premiumText4</T>,
						]}
					/>
				</PlansContainer>
			</SectionContainer>
		</PageWrapper>
	);
}

export default ForEmployers;
