import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";
import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";

const T = i18n.createComponent();

export default class JobPosting extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
		const datePosted = new Date(
			this.props.jobAd.created
		).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		return (
			<div className="col-md-12 section_rview_back_color05 ">
				<div className="sect_re11 ">
					<div>
						<h4>
							<strong>{this.props.jobAd.jobTitle}</strong>
						</h4>
					</div>

					<div>
						<div className="add-buttons">
							<a
								href={urlGenerators.vizeApplyForJobUrl(
									this.props.jobAd.id
								)}
								className="btn btn-primary"
							>
								{" "}
								{i18n.__("common.jobpostings.apply_now")}
							</a>
						</div>
						<p>
							<FontAwesomeIcon icon="map-marker" />&nbsp;&nbsp;&nbsp;{processLocation(
								JSON.stringify(this.props.jobAd.locations[0])
							)}
						</p>
						<p>
							<FontAwesomeIcon icon="money-bill-alt" />&nbsp;&nbsp;
							{this.props.jobAd.pesosPerHour}
							{i18n.__("common.jobpostings.hour")}
						</p>
						<p>
							<FontAwesomeIcon icon="calendar" />&nbsp;&nbsp;
							{this.props.jobAd.contractType}
						</p>
					</div>

					<hr />
					<h4 className="h4-font-sz-job">
						<T>common.jobpostings.job_description</T>
					</h4>
					<div className="h4-font-sz">
						<article>
							<p>{this.props.jobAd.jobDescription}</p>
							<input
								id={this.props.jobAd.id}
								className="read-more-toggle"
								type="checkbox"
							/>
							<div className="read-more-content">
								<br />
								<h4>
									<T>common.jobpostings.qualifications</T>
								</h4>
								<p>{this.props.jobAd.qualifications} </p>
								<br />
								<div>
									<h4>
										<T>
											common.jobpostings.responsibilities
										</T>
									</h4>
									<p>{this.props.jobAd.responsibilities}</p>
								</div>
							</div>

							<label
								className="read-more-toggle-label"
								htmlFor={this.props.jobAd.id}
							>
								{" "}
							</label>
							<div className="fl-ri">
								<p>
									{i18n.__("common.jobpostings.posted_on")}{" "}
									{datePosted}
								</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		);
	}
}