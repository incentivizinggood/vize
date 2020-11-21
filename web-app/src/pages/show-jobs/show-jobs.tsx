import React from "react";
import styled from "styled-components";

import JobPosting from "src/components/jobs/job-posting.tsx";
import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";
import { forSize } from "src/responsive";
import { useShowJobsQuery } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor;

const PageStyling = styled.div`
	padding-top: 135px;
	padding-bottom: 30px;
	padding-right: 50px;
	padding-left: 50px;

	${forSize.tabletAndDown} {
		padding-right: 10px;
		padding-left: 10px;
	}
`;

export default function ShowJobs(): JSX.Element {
	const { loading, error, data } = useShowJobsQuery();

	if (loading) {
		return (
			<h2>
				<T.jobsearch.loading />
			</h2>
		);
	}

	if (error) {
		console.error(error);
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	const RenderedItems = data.searchJobAds.nodes.map(function(jobad) {
		return <JobPosting key={jobad.id} job={jobad} />;
	});

	let message;
	if (RenderedItems.length < 1) {
		message = (
			<h2>
				<T.jobsearch.nojobs />
			</h2>
		);
	} else {
		message = "";
	}

	return (
		<PageWrapper title="Trabajos - Vize">
			<PageStyling>
				<h2>
					{data.searchJobAds.nodes.length}{" "}
					<T.jobsearch.jobsAvailable />
				</h2>
				{message}
				{RenderedItems}
			</PageStyling>
		</PageWrapper>
	);
}
