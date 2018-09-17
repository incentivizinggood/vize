import React from "react";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import i18n from "meteor/universe:i18n";

/* A page Foremployers  */
const T = i18n.createComponent();

export default class ForEmployers extends React.Component {
	render() {
		return (
			<div>
				<Header />
				{/* find great employer */}
				<div className="welcome  back-img-emp ">
					<div className="container ">
						<div className="col-md-12 ">
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
							<div className="companies-btn  ">
								<center>
									<a
										href="/register"
										className="button out-bodr-get  "
									>
										<T>
											common.forEmployers.get_started_button
										</T>
									</a>
								</center>
							</div>
						</div>
						<div className="clearfix" />
					</div>
				</div>
				{/* find great employer */}
				{/* find card sect */}
				<div className="welcome  welpad  back-hm-community">
					<div className="container">
						<div className="col-md-12 ">
							<center>
								<div className="hover panel-hm">
									<div className="front">
										<div className="frontTitle">
											<T>
												common.forEmployers.increase_workers
											</T>{" "}
											<br />
											<T>common.forEmployers.retention</T>
										</div>
										<div className="frontLogo    emp-icon2" />
										<div className="frontLocation   plu">
											<T>
												common.forEmployers.increase_workers_text
											</T>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
										<br />
										{/* }  <div  className="fl-ri-re">
																								<button><i className="fa fa-plus" ></i>&nbsp; Add a Review</button>
																								</div> */}
										<br />
									</div>
								</div>
								<div className="hover panel-hm">
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
										<div className="frontLogo   emp-icon1" />
										<div className="frontLocation">
											<T>
												common.forEmployers.grow_response_text
											</T>
										</div>
										<br />
										{/* <div  className="fl-ri-re">
																								<button><i className="fa fa-plus" ></i>&nbsp; Add a Salary</button>
																								</div> */}
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
				<div className="welcome  emp-wel">
					<div className="container ">
						<div className="col-md-6 ">
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
										<a
											href="/register"
											className="button out-butt-dark"
										>
											<T>
												common.forEmployers.register_button
											</T>
										</a>
									</center>
								</div>
							</div>
							<div className="col-md-1" />
						</div>
						<div className="clearfix" />
					</div>
				</div>
				{/* //section */}

				<Footer />
			</div>
		);
	}
}