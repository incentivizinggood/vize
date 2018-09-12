import { Meteor } from "meteor/meteor";
import React from "react";

import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";
import { urlGenerators } from "/imports/startup/client/router.jsx";
import { Companies } from "/imports/api/data/companies.js";

import { If, Then, Else } from "/imports/ui/if-else.jsx";
import LangSelector from "./lang-selector.jsx";

const T = i18n.createComponent();

function EmployerHeader(props) {
	let companyURL;
	if (props.user.companyId) {
		if (Meteor.isDevelopment) console.log(props.user.companyId);
		companyURL = urlGenerators.vizeProfileUrl(props.user.companyId);
	} else {
		companyURL = "/create-company-profile";
	}

	return (
		<div className="top-nav">
			<nav>
				<div className="container">
					<div className="navbar-header logo">
						<button
							type="button"
							className="navbar-toggle collapsed slide-toggle "
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
						>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<h2 className="site-logo">
							<a href="/">
								<img src="/images/logo.png" />
							</a>
						</h2>
					</div>
					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav left_nav">
							<li>
								<If cond={props.isLoggedIn}>
									<Then>
										<a
											href="/my-account"
											type="button"
											className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
										>
											My Account
										</a>
									</Then>
									<Else>
										<a
											href="/login"
											type="button"
											className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
										>
											Sign Up or Log In
										</a>
									</Else>
								</If>
							</li>
							<li>
								<a href={companyURL} className="link-kumya ">
									<span>My Company</span>
								</a>
							</li>
							<li>
								<a href="/post-a-job" className="link-kumya">
									<span>Post a Job</span>
								</a>
							</li>
							<li>
								<a
									href="/employer-resources"
									className="link-kumya"
								>
									<span>Resources</span>
								</a>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<If cond={props.isLoggedIn}>
								<Then>
									<li className="navigation-only-display dropdown pf  show-on-hover-pf">
										<a
											href="#"
											className="dropdown-toggle  "
											data-toggle="dropdown"
										>
											<img
												src="images/profileIcon.png"
												className="img-responsive  dp-profile"
											/>{" "}
										</a>
										<ul className="dropdown-menu pf">
											<li className="tr">
												<a
													href="/my-account"
													className="link-kumya"
												>
													{i18n.__(
														"common.header.myaccount"
													)}
												</a>
											</li>
											<li className="tr">
												<a
													onClick={Meteor.logout}
													className="link-kumya"
													style={{
														cursor: "pointer",
													}}
												>
													<T>common.header.logout</T>
												</a>
											</li>
										</ul>
									</li>
								</Then>
								<Else>
									<li>
										<a
											href="/register"
											type="button"
											id="register-button"
											className="btn navbar-btn margin-right btn-green hvr-icon-forward"
										>
											{i18n.__("common.header.signup")}
										</a>
									</li>
									<li>
										<a
											href="/login"
											className="navbar-link margin-right"
										>
											<T>common.header.login</T>
										</a>
									</li>
								</Else>
							</If>

							<li className="dropdown">
								<LangSelector />
							</li>
							<br />
							<If cond={props.isLoggedIn}>
								<Then>
									<li>
										<a
											onClick={Meteor.logout}
											className="toggle-only-display link-kumya"
											style={{ cursor: "pointer" }}
										>
											<T>common.header.logout</T>
										</a>
									</li>
								</Then>
								<Else> </Else>
							</If>
						</ul>
						<div className="clearfix" />
					</div>
				</div>
			</nav>
		</div>
	);
}

export default withTracker(() => ({
	isLoggedIn: Meteor.userId() !== null,
	user: Meteor.user(),
}))(EmployerHeader);
