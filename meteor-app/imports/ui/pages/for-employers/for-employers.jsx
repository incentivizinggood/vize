import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

/* A page Foremployers  */
const T = i18n.createComponent();

const Bold = styled.span`
	font-weight: bold;
`;

const ProblemPoint = styled.p`
	display: block;
`;

const PlanOption = ({ name, items }) => (
	<div>
		{name}
		<ul>
			{items.map(item => (
				<li>{item}</li>
			))}
		</ul>
		<a>Get Started</a>
	</div>
);

function ForEmployers() {
	return (
		<PageWrapper>
			<div>
				<h1>
					Recruit and retain the best workforce in Tijuna with Vize
				</h1>
				<button>Get started</button>
			</div>
			<section>
				<h1>The Problem</h1>
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
				<h1>The Solution</h1>
				<section>
					<h2>Recruiting</h2>
					<p>
						We help you recruit the best employies with affordable
						and effective job posts.
					</p>
				</section>
				<section>
					<h2>Retainment</h2>
					<p>
						We then give you actionable insites on how to retain
						these employees using data directly from workers all
						across Tijuna.
					</p>
				</section>
			</section>
			<section>
				<h1>Pricing</h1>
				<p>
					The first 10 customers get full <Bold>premium access</Bold>{" "}
					to our services <Bold>95% off</Bold> for{" "}
					<Bold>$15/month</Bold> for 90 days.
				</p>
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
			</section>
		</PageWrapper>
	);
}

export default ForEmployers;
