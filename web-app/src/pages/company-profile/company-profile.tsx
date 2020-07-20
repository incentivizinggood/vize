import React from "react";
import styled from "styled-components";
import { forSize } from "src/responsive";

import PageWrapper from "src/components/page-wrapper";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";

import CompanyProfileSummary from "./summary";
import { OverviewTab, ReviewTab, JobTab, SalaryTab } from "./tabs";
import { useCompanyProfilePageQuery } from "generated/graphql-operations";
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

export interface CompanyProfileProps {
	companyId: string;
}

/* The Company Profile  page of the site. */
export default function CompanyProfile({
	companyId,
}: CompanyProfileProps): JSX.Element {
	const { loading, error, data } = useCompanyProfilePageQuery({
		variables: { companyId },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		console.log(error);
		console.log(data);
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	if (!data || !data.company) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	return (
		<PageWrapper title="Company Profile">
			<CompanyPageContainer>
				<CompanyProfileSummary companyId={companyId} />

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
										<OverviewTab company={data.company} />
									),
								},
								{
									path: "reviews",
									label: <T.companyprofile.reviews />,
									content: (
										<ReviewTab company={data.company} />
									),
								},
								{
									path: "jobs",
									label: <T.companyprofile.jobs />,
									content: (
										<JobTab
											jobAds={data.company.jobAds}
											jobsCount={data.company.numJobAds}
										/>
									),
								},
								{
									path: "salaries",
									label: <T.companyprofile.salaries />,
									content: (
										<SalaryTab companyId={companyId} />
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
