import React from "react";
import styled from "styled-components";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";
import Banner from "/imports/ui/components/banner";
import { forSize } from "/imports/ui/responsive.js";

const t = i18n.createTranslator("common.forEmployers");
const T = i18n.createComponent(t);

const horizontalPaddingVal = "15px";

const P = styled.p`
	color: ${props => props.theme.main};
	text-align: center;
	font-size: 18pt;
	font-weight: bolder;

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
	color: ${props => props.theme.main};
	text-align: center;
	font-size: x-large;
	font-weight: bolder;

	max-width: 700px;
	padding: 50px;
	margin-left: auto;
	margin-right: auto;

	& + & {
		margin-top: 100px;
	}

	${forSize.phoneOnly} {
		padding: 30px;
	}
`;

const SectionTitle = styled.h1`
	color: ${props => props.theme.main};
	padding-top: 100px;
	margin-bottom: 50px;
	margin-left: 2.5em;
	font-weight: bold;
	font-size: 55px;

	${forSize.tabletLandscapeAndDown} {
		text-align: center;
		margin-left: 0em;
		font-size: 40px;
	}
`;

const SubsectionTitle = styled.h2`
	color: ${props => props.theme.main};
	text-align: center;
	font-weight: bold;
`;

const Button = styled.a`
	background: ${props => props.theme.main};

	/* Increase spesificity to override a global style. */
	&&&&&&&& {
		color: white;
	}

	border-radius: 3px;
	display: inline-block;
	padding: 20px 40px;
	font-weight: bold;
	font-size: 21px;
`;

const GetStartedBig = () => (
	<Button style={{ fontSize: 30 }} href="/register">
		Get Started
	</Button>
);
const GetStarted = () => (
	<Button href="/register">
		<T>getStarted</T>
	</Button>
);

const PlanBox = styled.div`
	color: ${props => props.theme.main};
	border: 1px solid black;
	margin: 10px;
	width: 30rem;
	padding: calc(5rem - 20px) 5rem;
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

const ShadowBox = styled.div`
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	background-color: white;
	padding: 70px;

	${forSize.phoneOnly} {
		padding: 30px;
	}
`;

const PlanFeatureList = styled.ul`
	list-style-type: none;
	line-height: 1.5;

	/* Push the "Get Started" button to the bottom */
	flex: 1;
`;

const PlanName = styled.h1`
	font-weight: bold;
`;

const PlanOption = ({ name, items }) => (
	<PlanBox>
		<PlanName>{name}</PlanName>
		<PlanFeatureList>
			{items.map(item => (
				<li>{item}</li>
			))}
		</PlanFeatureList>
		<GetStarted />
	</PlanBox>
);

const PlansContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 150px;

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

const Recruiting = styled.section`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	> div {
		max-width: 40em;
	}

	${forSize.tabletAndDown} {
		flex-direction: column-reverse;
	}
`;

const Retainment = styled.section`
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

const Foo = styled(P)`
	max-width: 620px;
	margin-left: auto;
	margin-right: auto;
`;

function ForEmployers() {
	const analyticsImg = `/images/${t("analyticsDashboard")}`;
	console.log(analyticsImg);
	return (
		<PageWrapper title="Employers" navIsAnimated>
			<Banner>
				<PageTitle>
					<T>headerText</T>
				</PageTitle>
				<GetStartedBig />
			</Banner>
			<section style={{ backgroundColor: "#fafbfc" }}>
				<SectionTitle>
					<T>heading1</T>
				</SectionTitle>

				<ProblemPoint>
					<ShadowBox>
						<T>card1part1</T> <Bold>90% - 120%</Bold>
						<T>card1part2</T>{" "}
						<Bold>
							<T>card1part3</T>
						</Bold>
					</ShadowBox>
				</ProblemPoint>

				<ProblemPoint>
					<ShadowBox>
						<T>card2part1</T>{" "}
						<Bold>
							<T>card2part2</T>
						</Bold>
					</ShadowBox>
				</ProblemPoint>
				<ProblemPoint>
					<ShadowBox>
						<T>card3part1</T>{" "}
						<Bold>
							<T>card3part2</T>
						</Bold>
					</ShadowBox>
				</ProblemPoint>
			</section>
			<section>
				<SectionTitle>
					<T>heading2</T>
				</SectionTitle>
				<Recruiting>
					<div>
						<SubsectionTitle>
							<T>recruitingHeading</T>
						</SubsectionTitle>
						<P>
							<T>recruitingText</T>
						</P>
					</div>
					<img
						src="/images/example-job-post-square.png"
						className="img-responsive"
					/>
				</Recruiting>
				<Retainment>
					<div>
						<SubsectionTitle>
							<T>retainmentHeading</T>
						</SubsectionTitle>
						<P>
							<T>retainmentText</T>
						</P>
					</div>
					<img
						className="img-responsive"
						src={`/images/${t("analyticsDashboard")}`}
					/>
				</Retainment>
			</section>
			<section>
				<SectionTitle>
					<T>heading3</T>
				</SectionTitle>
				<Foo>
					<T>pricingText1</T>{" "}
					<Bold>
						<T>pricingText2</T>
					</Bold>{" "}
					<T>pricingText3</T>{" "}
					<Bold>
						<T>pricingText4</T>
					</Bold>{" "}
					<T>pricingText5</T>
				</Foo>
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
			</section>
		</PageWrapper>
	);
}

export default ForEmployers;
