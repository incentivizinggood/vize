import React from "react";
import i18n from "meteor/universe:i18n";
import { urlGenerators } from "../../startup/client/router.jsx";

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
						<h4>
							<strong>{this.props.item.jobTitle}</strong>
						</h4>
					</div>

					<div>
						<div className="add-buttons">
							<a
								href={urlGenerators.vizeApplyForJobUrl(
									this.props.item._id
								)}
								className="btn btn-primary"
							>
								{" "}
								{i18n.__("common.jobpostings.apply_now")}
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
							{i18n.__("common.jobpostings.hour")}
						</p>
						<p>
							{" "}
							<i className="fa fa-calendar" />&nbsp;&nbsp;{
								this.props.item.contractType
							}
						</p>
					</div>
					{/* <div  className="add-buttons">
                        <a href={urlGenerators.vizeApplyForJobUrl(
							this.props.item._id
						)} className="btn btn-primary"> <i aria-hidden="true"></i>   Apply now</a>
                      </div> */}

					<hr />
					<h4 className="h4-font-sz-job">
						<T>common.jobpostings.job_description</T>
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
									<T>common.jobpostings.qualifications</T>
								</h4>
								<p>{this.props.item.qualifications} </p>
								<br />
								<div>
									<h4>
										<T>
											common.jobpostings.responsibilities
										</T>
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
								{/* there is no date field in the Schema */}
								{/* <p>posted on {this.props.item.datePosted.toString()}</p> */}
								<p>
									{i18n.__("common.jobpostings.posted_on")}{" "}
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
