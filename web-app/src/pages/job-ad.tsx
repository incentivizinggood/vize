import React from "react";
import styled from "styled-components";

import PageWrapper from "src/components/page-wrapper";
import JobPosting from "src/components/jobs/job-posting";
import { useJobAdPageQuery } from "generated/graphql-operations";
import Spinner from "src/components/Spinner";
import { PanelContainer, Panel } from "src/components/panel";

const Center = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 67px;
	max-width: 1130px;
	padding: 10px;
`;

interface JobAdPageProps {
	jobAdId: string;
}

// This page is to view a single job post (which can currently only be done through a direct URL)
export function JobAdPage({ jobAdId }: JobAdPageProps): JSX.Element {
	const { loading, data } = useJobAdPageQuery({
		variables: { jobAdId },
	});

	return (
		<PageWrapper>
			{loading ? (
				<Spinner />
			) : data && data.jobAd ? (
				<Center>
					<JobPosting job={data.jobAd} isMinimizable={false} />
				</Center>
			) : (
				<PanelContainer>
					<Panel roundedEdges>
						{/* TODO: Add better error reporting */}
						<p>
							La oferta de empleo no se pudo encontrar. Es
							probable que la empresa elimino la oferta.
						</p>
					</Panel>
				</PanelContainer>
			)}
		</PageWrapper>
	);
}
