import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";
import Banner from "/imports/ui/components/banner";

/* A page Foremployers  */
const T = i18n.createComponent();

const vizeBlue = "#2699FB";
const vizePaleBlue = "#F1F9FF";

const P = styled.p`
	color: ${vizeBlue};
	text-align: center;
	font-size: 18pt;
	font-weight: bolder;
`;

const Bold = styled.span`
	font-weight: bold;
`;

const ProblemPoint = styled.p`
	display: block;
	color: ${vizeBlue};
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

	@media (max-width: 576px) {
		padding: 30px;
	}
`;

const SectionTitle = styled.h1`
	color: ${vizeBlue};
	padding-top: 100px;
	margin-bottom: 50px;
	margin-left: 2.5em;
	font-weight: bold;
	font-size: 55px;

	@media (max-width: 992px) {
		text-align: center;
		margin-left: 0em;
		font-size: 40px;
	}
`;

const SubsectionTitle = styled.h2`
	color: ${vizeBlue};
	text-align: center;
	font-weight: bold;
`;

const Button = styled.a`
	background: ${vizeBlue};

	/* Increase spesificity to override a global style. */
	&&&&&&&& {
		color: white;
	}

	border-radius: 3px;
	display: inline-block;
	padding: 10px 20px;
	font-weight: bold;
`;

const GetStarted = () => <Button>Get Started</Button>;

const PlanBox = styled.div`
	color: ${vizeBlue};
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
`;

const ShadowBox = styled.div`
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	background-color: white;
	padding: 70px;

	@media (max-width: 576px) {
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
`;

const Recruiting = styled.section`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	> div {
		max-width: 40em;
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
	return (
		<PageWrapper navIsAnimated>
			<Banner>
				<PageTitle>
					Recruit and retain the best workforce in Tijuna with Vize
				</PageTitle>
				<GetStarted />
			</Banner>
			<section style={{ backgroundColor: "#fafbfc" }}>
				<SectionTitle>The Problem</SectionTitle>

				<ProblemPoint>
					<ShadowBox>
						Many factories like yours face turnover rates of{" "}
						<Bold>90% - 120%</Bold> of their workforce{" "}
						<Bold>every year</Bold>
					</ShadowBox>
				</ProblemPoint>

				<ProblemPoint>
					<ShadowBox>
						Forcing you to spend more time and money on{" "}
						<Bold>recruiting training</Bold>
					</ShadowBox>
				</ProblemPoint>
				<ProblemPoint>
					<ShadowBox>
						Losing 1 worker costs you at least{" "}
						<Bold>$615 every month</Bold>
					</ShadowBox>
				</ProblemPoint>
			</section>
			<section>
				<SectionTitle>The Solution</SectionTitle>
				<Recruiting>
					<div>
						<SubsectionTitle>Recruiting</SubsectionTitle>
						<P>
							We help you recruit the best employies with
							affordable and effective job posts.
						</P>
					</div>
					<img src="/images/example-job-post-square.png" />
				</Recruiting>
				<Retainment>
					<div>
						<SubsectionTitle>Retainment</SubsectionTitle>
						<P>
							We then give you actionable insites on how to retain
							these employees using data directly from workers all
							across Tijuna.
						</P>
					</div>
					<img src="/images/analytics-dashboard.png" />
				</Retainment>
			</section>
			<section>
				<SectionTitle>Pricing</SectionTitle>
				<Foo>
					The first 10 customers get full <Bold>premium access</Bold>{" "}
					to our services <Bold>95% off</Bold> for{" "}
					<Bold>$15/month</Bold> for 90 days.
				</Foo>
				<PlansContainer>
					<PlanOption
						name="Buisness"
						items={[
							"5 Job Posts",
							"Data Analitics Dashboard",
							"Buisiness Resources",
						]}
					/>
					<PlanOption
						name="Premium"
						items={[
							"10 Job Posts",
							"Data Analitics Dashboard",
							"Buisiness Resources",
							"Individualized analysis and consulting",
						]}
					/>
				</PlansContainer>
			</section>
		</PageWrapper>
	);
}

export default ForEmployers;
