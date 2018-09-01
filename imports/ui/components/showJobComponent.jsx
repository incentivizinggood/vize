import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";
import { urlGenerators } from "../../startup/client/router.jsx";

const T = i18n.createComponent();

export default class ShowJobComponent extends React.Component {
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
		// @options -  For the date formatting
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		const datePosted = new Date(this.props.item.created);

		return (
			<div className="col-md-12 section_rview_back_color05 ">
				<div className="sect_re11 ">
					<div>
						<h3>
							<strong>{this.props.item.company.name}</strong>
						</h3>
						<br />
						<h4>
							<strong>{this.props.item.jobTitle}</strong>
						</h4>
					</div>

					<div>
						<div className="add-buttons">
							<a
								href={urlGenerators.vizeApplyForJobUrl(
									this.props.item.id
								)}
								className="btn btn-primary"
							>
								{" "}
								{i18n.__("common.showjob.apply_now")}
							</a>
						</div>
						<p>
							{" "}
							<FontAwesomeIcon icon="map-marker" />&nbsp;&nbsp;&nbsp;{
								this.props.item.locations[0]
							}
						</p>
						<p>
							{" "}
							<FontAwesomeIcon icon="money-bill-alt" />&nbsp;&nbsp;{
								this.props.item.pesosPerHour
							}
							<T>common.showjob.hour</T>
						</p>
						<p>
							{" "}
							<FontAwesomeIcon icon="calendar" />&nbsp;&nbsp;{
								this.props.item.contractType
							}
						</p>
					</div>

					<hr />
					<h4 className="h4-font-sz-job">
						<T>common.showjob.job_description</T>
					</h4>
					<div className="h4-font-sz">
						<article>
							<p>{this.props.item.jobDescription}</p>
							<input
								id={this.props.item.id}
								className="read-more-toggle"
								type="checkbox"
							/>
							<div className="read-more-content">
								<br />
								<h4>
									<T>common.showjob.qualifications</T>
								</h4>
								<p>{this.props.item.qualifications} </p>
								<br />
								<div>
									<h4>
										<T>common.showjob.responsibilities</T>
									</h4>
									<p>{this.props.item.responsibilities}</p>
								</div>
							</div>

							<label
								className="read-more-toggle-label"
								htmlFor={this.props.item.id}
							>
								{" "}
							</label>
							<div className="fl-ri">
								<p>
									<T>common.showjob.posted_on</T>{" "}
									{datePosted.toLocaleDateString(
										"en-US",
										options
									)}
								</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		);
	}
}
