import React from "react";
import i18n from "meteor/universe:i18n";

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
		return (
			<div className="col-md-12 section_rview_back_color05 ">
				<div className="sect_re11 ">
					<div>
						<h3>
							<strong>{this.props.item.companyName}</strong>
						</h3>
						<br />
						<h4>
							<strong>{this.props.item.jobTitle}</strong>
						</h4>
					</div>

					<div>
						<div className="add-buttons">
							<a
								href={this.props.item.vizeApplyForJobUrl}
								className="btn btn-primary"
							>
								{" "}
								{i18n.__("common.showjob.apply_now")}
							</a>
						</div>
						<p>
							{" "}
							<i className="fa fa-map-marker" />&nbsp;&nbsp;&nbsp;{
								this.props.item.locations[0]
							}
						</p>
						<p>
							{" "}
							<i className="fa fa-money" />&nbsp;&nbsp;{
								this.props.item.pesosPerHour
							}
							<T>common.showjob.hour</T>
						</p>
						<p>
							{" "}
							<i className="fa fa-calendar" />&nbsp;&nbsp;{
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
								id={this.props.item._id}
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
								htmlFor={this.props.item._id}
							>
								{" "}
							</label>
							<div className="fl-ri">
								<p>
									<T>common.showjob.posted_on</T>{" "}
									{this.props.item.datePosted.toLocaleDateString(
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
