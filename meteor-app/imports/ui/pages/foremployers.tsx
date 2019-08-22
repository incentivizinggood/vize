import React from "react";
import { Link } from "react-router-dom";

import { i18n } from "meteor/universe:i18n";

import PageWrapper from "imports/ui/components/page-wrapper";

/* A page Foremployers  */
const T = i18n.createComponent();

export default class ForEmployers extends React.Component {
	render() {
		return (
			<PageWrapper title="Employers">
				<div className="full-width-container forEmployees-header">
					<div className="container ">
						<div className="col-md-12">
							<div className="great-emp-hm">
								<h1>
									<T>common.forEmployers.find_best</T>
								</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									<T>common.forEmployers.find_best_part1</T>{" "}
									<br />
									<T>common.forEmployers.find_best_part2</T>
								</h4>
							</div>
							<br />
							<div>
								<center>
									<Link
										to={{
											pathname: "/register",
											state: {
												prevPath: location.pathname,
											},
										}}
										className="button vize-blue-button"
										style={{ fontSize: 34 }}
									>
										<T>
											common.forEmployers.get_started_button
										</T>
									</Link>
								</center>
							</div>
						</div>
						<div className="clearfix" />
					</div>
				</div>

				<div className="full-width-container">
					<div className="container">
						<div className="col-md-12">
							<center>
								<div className="panel-card">
									<div className="front">
										<div className="frontTitle">
											<T>
												common.forEmployers.increase_workers
											</T>{" "}
											<br />
											<T>common.forEmployers.retention</T>
										</div>
										<div className="frontLogo">
											<img
												className="img-responsive"
												src="images/upArrowIcon.png"
											/>
										</div>
										<div className="frontLocation">
											<T>
												common.forEmployers.increase_workers_text
											</T>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
										<br />

										<br />
									</div>
								</div>
								<div className="panel-card">
									<div className="front">
										<div className="frontTitle">
											<T>
												common.forEmployers.grow_in_response
											</T>{" "}
											<br />{" "}
											<T>
												common.forEmployers.to_worker_feedback
											</T>
										</div>
										<div className="frontLogo">
											<img
												className="img-responsive"
												src="images/feedbackIcon.png"
											/>
										</div>
										<div className="frontLocation">
											<T>
												common.forEmployers.grow_response_text
											</T>
										</div>
										<br />

										<br />
									</div>
								</div>
							</center>
						</div>
						<div className="clearfix" />
					</div>
				</div>
				{/* find card sect
													     find great sect */}
				<div className="full-width-container emp-wel">
					<div className="container">
						<div className="col-md-6">
							<div>
								<center>
									<img
										className="img-responsive"
										src="images/past.png"
									/>
								</center>
							</div>
						</div>
						<div className="col-md-6 ">
							<div className="great-job-hm">
								<h1>
									<T>common.forEmployers.reach_thousand</T>{" "}
								</h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									<T>
										common.forEmployers.reach_thousand_text
									</T>
								</h4>
							</div>
						</div>
						<div className="clearfix" />
					</div>
				</div>
				{/* find great sect
													  services */}
				<div className="star" id="services">
					<div className="container">
						<div className="row">
							<div className="col-md-1" />
							<div className="col-md-8">
								<center>
									<h1 className="titlestar22">
										<T>common.forEmployers.accelerate</T>{" "}
									</h1>
								</center>
							</div>
							<div className="col-md-2">
								<div className="titlestar">
									<center>
										{" "}
										<Link
											to={{
												pathname: "/register",
												state: {
													prevPath: location.pathname,
												},
											}}
											className="button black-border-button"
										>
											<T>
												common.forEmployers.register_button
											</T>
										</Link>
									</center>
								</div>
							</div>
							<div className="col-md-1" />
						</div>
						<div className="clearfix" />
					</div>
				</div>
				{/* //section */}
			</PageWrapper>
		);
	}
}
