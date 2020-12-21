import React from "react";
import styled from "styled-components";
import { forSize } from "src/responsive";

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
									path: "descripcion-general",
									label: <T.companyprofile.overview />,
									content: (
										<OverviewTab companyId={companyId} />
									),
								},
								{
									path: "evaluaciones",
									label: <T.companyprofile.reviews />,
									content: (
										<ReviewTab companyId={companyId} />
									),
								},
								{
									path: "trabajos",
									label: <T.companyprofile.jobs />,
									content: <JobTab companyId={companyId} />,
								},
								{
									path: "salarios",
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
