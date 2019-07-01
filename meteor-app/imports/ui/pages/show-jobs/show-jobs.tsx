import React from "react";
import { Query } from "react-apollo";

import i18n from "meteor/universe:i18n";

import ShowJobComponent from "/imports/ui/components/showJobComponent.jsx";
import PageWrapper from "/imports/ui/components/page-wrapper";

import ShowJobsQuery from "./show-jobs.graphql";

const T = i18n.createComponent();

const ShowJobs = () => (
	<Query query={ShowJobsQuery}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<h2>
						<T>common.jobsearch.loading</T>
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
						<T>common.jobsearch.nojobs</T>
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
											<T>
												common.jobsearch.jobsAvailable
											</T>
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
