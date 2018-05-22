import React from "react";

export default class ShowJobComponent extends React.Component {
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
								Apply now
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
							}/Hour
						</p>
						<p>
							{" "}
							<i className="fa fa-calendar" />&nbsp;&nbsp;{
								this.props.item.contractType
							}
						</p>
					</div>

					<hr />
					<h4 className="h4-font-sz-job">Job Description</h4>
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
								<h4>Qualifications</h4>
								<p>{this.props.item.qualifications} </p>
								<br />
								<div>
									<h4>Responsibilities</h4>
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
									posted on{" "}
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
