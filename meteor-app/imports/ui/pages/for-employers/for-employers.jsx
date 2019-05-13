import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

/* A page Foremployers  */
const T = i18n.createComponent();

const vizeBlue = "#2699FB";
const vizePaleBlue = "#F1F9FF";

const P = styled.p`
	color: ${vizeBlue};
	text-align: center;
	font-size: 18pt;
`;

const Bold = styled.span`
	font-weight: bold;
`;

const ProblemPoint = styled.p`
	display: block;
	color: ${vizeBlue};
	border: 4px solid ${vizePaleBlue};
	text-align: center;
	font-size: x-large;

	max-width: 700px;
	padding: 80px 100px;
	margin-left: auto;
	margin-right: auto;

	& + & {
		margin-top: 100px;
	}
`;

const SectionTitle = styled.h1`
	color: ${vizeBlue};
	margin-top: 100px;
`;
const SubsectionTitle = styled.h2`
	color: ${vizeBlue};
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

	display: flex;
	flex-direction: column;
	> * {
		margin: 20px 0;
	}
`;

const PlanFeatureList = styled.ul`
	list-style-type: none;
	line-height: 1.5;

	/* Push the "Get Started" button to the bottom */
	flex: 1;
`;

const PlanOption = ({ name, items }) => (
	<PlanBox>
		<h1>{name}</h1>
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
`;

const Banner = styled.div`
	height: 700px;

	background: url(/images/banner-img.jpg) no-repeat 0 0;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
	> div {
		width: 100%;
		text-align: center;
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
`;

function ForEmployers() {
	return (
		<PageWrapper navIsAnimated>
			<Banner>
				<div>
					<PageTitle>
						Recruit and retain the best workforce in Tijuna with
						Vize
					</PageTitle>
					<GetStarted />
				</div>
			</Banner>
			<section>
				<SectionTitle>The Problem</SectionTitle>
				<ProblemPoint>
					Many factories like yours face turnover rates of{" "}
					<Bold>90% - 120%</Bold> of their workforce{" "}
					<Bold>every year</Bold>
				</ProblemPoint>
				<ProblemPoint>
					Forcing you to spend more time and money on{" "}
					<Bold>recruiting training</Bold>
				</ProblemPoint>
				<ProblemPoint>
					Loseing 1 worker costs you at least{" "}
					<Bold>$615 every month</Bold>
				</ProblemPoint>
			</section>
			<section>
				<SectionTitle>The Solution</SectionTitle>
				<section>
					<SubsectionTitle>Recruiting</SubsectionTitle>
					<P>
						We help you recruit the best employies with affordable
						and effective job posts.
					</P>
				</section>
				<section>
					<SubsectionTitle>Retainment</SubsectionTitle>
					<P>
						We then give you actionable insites on how to retain
						these employees using data directly from workers all
						across Tijuna.
					</P>
				</section>
			</section>
			<section>
				<SectionTitle>Pricing</SectionTitle>
				<P>
					The first 10 customers get full <Bold>premium access</Bold>{" "}
					to our services <Bold>95% off</Bold> for{" "}
					<Bold>$15/month</Bold> for 90 days.
				</P>
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
