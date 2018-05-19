import React from "react";

export default class JobPosting extends React.Component {
	render() {
		var options = {
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
					{/* <div  className="add-buttons">
                        <a href={this.props.item.vizeApplyForJobUrl} className="btn btn-primary"> <i aria-hidden="true"></i>   Apply now</a>
                      </div> */}

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
								{/* there is no date field in the Schema */}
								{/* <p>posted on {this.props.item.datePosted.toString()}</p> */}
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
