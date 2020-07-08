import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import { forSize } from "src/responsive";

import ErrorBoundary from "src/components/error-boundary";
import PageWrapper from "src/components/page-wrapper";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";

import CompanyProfileSummary from "./summary";
import { OverviewTab, ReviewTab, JobTab, SalaryTab } from "./tabs";
import companyProfileQuery from "./company-profile.graphql";
import Tabs from "src/components/tabs";

const T = translations.legacyTranslationsNeedsRefactor;

const CompanyPageContainer = styled.div`
	margin-bottom: 15px;
	padding-left: 20px;
	padding-right: 20px;
	width: 1170px;
	margin-right: auto;
	margin-left: auto;

	${forSize.tabletLandscapeAndDown} {
		width: 750px;
	}
	${forSize.tabletAndDown} {
		padding: 1px;
		width: 100%;
	}
`;

const TabsContainer = styled.div`
	margin-bottom: 15px;
	margin-right: auto;
	margin-left: auto;
`;

/* The Company Profile  page of the site. */

function CompanyProfile_(props) {
	if (props.company === undefined) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	return (
		<PageWrapper title="Company Profile">
			<CompanyPageContainer>
				<CompanyProfileSummary company={props.company} />

				<br />
				{/* navigation */}
				<section>
					<TabsContainer>
						<Tabs
							tabs={[
								{
									path: "overview",
									label: <T.companyprofile.overview />,
									content: (
										<OverviewTab
											company={props.company}
											refetch={props.refetch}
										/>
									),
								},
								{
									path: "reviews",
									label: <T.companyprofile.reviews />,
									content: (
										<ReviewTab
											company={props.company}
											refetch={props.refetch}
										/>
									),
								},
								{
									path: "jobs",
									label: <T.companyprofile.jobs />,
									content: (
										<JobTab
											jobAds={props.jobAds}
											jobsCount={props.jobsCount}
										/>
									),
								},
								{
									path: "salaries",
									label: <T.companyprofile.salaries />,
									content: (
										<SalaryTab company={props.company} />
									),
								},
							]}
						/>
					</TabsContainer>
				</section>
			</CompanyPageContainer>
		</PageWrapper>
	);
}

// TODO: Split this file into view and container components.
const CompanyProfile = CompanyProfile_;

export default ({ companyId }) => (
	<Query query={companyProfileQuery} variables={{ companyId }}>
		{({ loading, error, data, refetch }) => {
			if (loading) {
				return <Spinner />;
			}
			if (error) {
				console.log(error);
				console.log(data);
				return <h2>{`Error! ${error.message}`}</h2>;
			}

			const refetchWithLog = () => {
				console.log("Refetching");
				refetch();
			};

			return (
				<CompanyProfile
					company={data.company}
					reviews={data.company.reviews}
					jobAds={data.company.jobAds}
					jobsCount={data.company.numJobAds}
					salaries={data.company.salaries}
					salariesCount={data.company.numJobAds}
					refetch={refetchWithLog}
				/>
			);
		}}
	</Query>
);
