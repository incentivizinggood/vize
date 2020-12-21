import React from "react";
import styled from "styled-components";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";

import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";

import CompanyProfileSummary from "./summary";
import { OverviewTab, ReviewTab, JobTab, SalaryTab } from "./tabs";
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
									path: urlGenerators.queryRoutes.overview,
									label: <T.companyprofile.overview />,
									content: (
										<OverviewTab companyId={companyId} />
									),
								},
								{
									path: urlGenerators.queryRoutes.reviews,
									label: <T.companyprofile.reviews />,
									content: (
										<ReviewTab companyId={companyId} />
									),
								},
								{
									path: urlGenerators.queryRoutes.jobs,
									label: <T.companyprofile.jobs />,
									content: <JobTab companyId={companyId} />,
								},
								{
									path: urlGenerators.queryRoutes.salaries,
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
