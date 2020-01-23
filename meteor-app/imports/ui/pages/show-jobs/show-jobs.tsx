import React from "react";
import { Query } from "react-apollo";

import ShowJobComponent from "imports/ui/pages/show-jobs/show-job-component";
import PageWrapper from "imports/ui/components/page-wrapper";
import { translations } from "imports/ui/translations";

import ShowJobsQuery from "./show-jobs.graphql";

const T = translations.legacyTranslationsNeedsRefactor;

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
				<PageWrapper>
					<div className="container-fluid  search_companies">
						<div className="row all_boxcolor1 select_box1">
							<div
								id="companies_header1"
								className="callbacks_container"
							>
								<ul id="slider3">
									<li>
										<h2>
											{data.searchJobAds.nodes.length}{" "}
											<T.jobsearch.jobsAvailable />
										</h2>
										{message}
										{RenderedItems}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</PageWrapper>
			);
		}}
	</Query>
);

export default ShowJobs;
