import React from "react";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { JobAds } from "/imports/api/data/jobads.js";
import ShowJobComponent from "/imports/ui/components/showJobComponent.jsx";
import Header from "/imports/ui/components/header.jsx";

const T = i18n.createComponent();

function ShowJobs(props) {
	if (!props.isReady) {
		return (
			<h2>
				<T>common.jobsearch.loading</T>
			</h2>
		);
	}

	const RenderedItems = props.jobads.map(function(jobad) {
		return <ShowJobComponent key={jobad._id} item={jobad} />;
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
					<div id="companies_header1" className="callbacks_container">
						<ul className="rslides" id="slider3">
							<li>
								<h2>
									{props.numberofjobs}{" "}
									<T>common.jobsearch.jobsAvailable</T>
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
}

export default withTracker(() => {
	const handle = Meteor.subscribe("JobAds");

	return {
		isReady: handle.ready(),
		jobads: JobAds.find({}).fetch(),
		numberofjobs: JobAds.find({}).count(),
	};
})(ShowJobs);
