import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import ShowJobComponent from "imports/ui/pages/show-jobs/show-job-component";
import PageWrapper from "imports/ui/components/page-wrapper";
import { translations } from "imports/ui/translations";
import { forSize } from "imports/ui/responsive.js";

import ShowJobsQuery from "./show-jobs.graphql";

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
//background: #d8d8d8;
const ShowJobs = () => (
	<Query query={ShowJobsQuery}>
		{({ loading, error, data }) => {
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
				return <ShowJobComponent key={jobad.id} item={jobad} />;
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
		}}
	</Query>
);

export default ShowJobs;
