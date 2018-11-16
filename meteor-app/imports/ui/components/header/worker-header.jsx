import React from "react";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { If, FirstIf } from "/imports/ui/components/if";
import LangSelector from "./lang-selector.jsx";

const T = i18n.createComponent();

class WorkerHeader extends React.Component {
	render() {
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
								<span className="sr-only">
									Toggle navigation
								</span>
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
									<FirstIf>
										<If cond={this.props.isLoggedIn}>
											<a
												href="/my-account"
												type="button"
												className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<T>common.header.myaccount</T>
											</a>
										</If>
										<If cond>
											<a
												href="/login"
												type="button"
												className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<span>
													<T>
														common.header.signup_or_login
													</T>
												</span>
											</a>
										</If>
									</FirstIf>
								</li>
								<li>
									<a
										href="/companies"
										className="link-kumya "
									>
										<span>
											<T>common.header.companies</T>
										</span>
									</a>
								</li>
								<li>
									<a href="/jobs" className="link-kumya">
										<span>
											<T>common.header.jobs</T>
										</span>
									</a>
								</li>
								<li>
									<a
										href="/worker-resources"
										className="link-kumya"
									>
										<span>
											<T>common.header.resources</T>
										</span>
									</a>
								</li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<FirstIf>
									<If cond={this.props.isLoggedIn}>
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
														className="navbar-link margin-right"
													>
														<T>
															common.header.myaccount
														</T>
													</a>
												</li>
												<li className="tr">
													<a
														onClick={Meteor.logout}
														className="navbar-link margin-right"
														style={{
															cursor: "pointer",
														}}
													>
														<T>
															common.header.logout
														</T>
													</a>
												</li>
											</ul>
										</li>
									</If>
									<If cond>
										<li>
											<a
												href="/register"
												type="button"
												id="register-button"
												className="btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<T>common.header.signup</T>
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
									</If>
								</FirstIf>

								<li className="dropdown">
									<LangSelector />
								</li>
								<li>
									<a
										href="/foremployers"
										className="link-kumya"
									>
										<span>
											<T>common.header.for_employers</T>
										</span>
									</a>
								</li>
								<br />
								<If cond={this.props.isLoggedIn}>
									<li>
										<a
											onClick={Meteor.logout}
											className="toggle-only-display navbar-link margin-right"
											style={{ cursor: "pointer" }}
										>
											<T>common.header.logout</T>
										</a>
									</li>
								</If>
							</ul>
							<div className="clearfix" />
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default withTracker(() => ({
	isLoggedIn: Meteor.userId() !== null,
}))(WorkerHeader);
