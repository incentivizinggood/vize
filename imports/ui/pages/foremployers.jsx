import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";

/* A page Foremployers  */

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
								<h1>Find the Best Employees in Tijuana</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									we provide more affordable and effective
									recruiting <br /> finding employees that
									stay
								</h4>
							</div>
							<div className="companies-btn  ">
								<center>
									<a
										href="/register"
										className="button out-bodr-get  "
									>
										Get Started
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
											Increase Worker <br />Retention
										</div>
										<div className="frontLogo    emp-icon2" />
										<div className="frontLocation   plu">
											With on inside look into the work
											environment of your company, workers
											will be able to determine whether
											your company is the right fit for
											them before being hired.
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
											Grow In Reponse <br /> To Worker
											Feedback
										</div>
										<div className="frontLogo   emp-icon1" />
										<div className="frontLocation">
											After creating a profile for your
											company, you will be able to read
											reviews from workers to get an idea
											of what they like and dislike about
											your company. Use negative feedback
											as a mechanism for growth
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
								<h1>Reach Thousands of Workers </h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									Register your company today to get instant
									access to a 60 day free trial that allows
									you to post an unlimited number of jobs.
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
										Accelerate your growth and discover
										thousands of potential employees{" "}
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
											Register
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
