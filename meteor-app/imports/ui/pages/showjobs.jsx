import React from "react";
import { Query } from "react-apollo";

import i18n from "meteor/universe:i18n";

import ShowJobComponent from "/imports/ui/components/showJobComponent.jsx";
import Header from "/imports/ui/components/header";

import ShowJobsQuery from "./showjobs.graphql";

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
				console.log(error);
				return <h2>{error}</h2>;
			}

			const RenderedItems = data.jobAds.map(function(jobad) {
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
				<div>
					<div className="navbarwhite">
						<Header />
					</div>
					<div className="container-fluid  search_companies">
						<div className="row all_boxcolor1 select_box1">
							<div
								id="companies_header1"
								className="callbacks_container"
							>
								<ul className="rslides" id="slider3">
									<li>
										<h2>
											{data.jobAds.length}{" "}
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
				</div>
			);
		}}
	</Query>
);

export default ShowJobs;
