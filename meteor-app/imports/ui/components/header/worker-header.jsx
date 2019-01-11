import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { When, Case } from "/imports/ui/components/when";
import LangSelector from "./lang-selector.jsx";
import LogoutButton from "./logout-button.jsx";

const T = i18n.createComponent();

class WorkerHeader extends React.Component {
	render() {
		return (
			<div className="top-nav">
				<nav>
					<div className="container container--ui-fix">
						<button
							type="button"
							className="navbar-toggle collapsed slide-toggle navbar-toggle--ui-fix"
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
						>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<h2 className="site-logo">
							<Link to="/">
								<img src="/images/logo.png" />
							</Link>
						</h2>
					</div>
					<div
						className="collapse navbar-collapse navbar-collapse--ui-fix"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav left_nav navbar-nav--ui-fix">
							<li>
								<Case>
									<When cond={this.props.isLoggedIn}>
										<Link
											to="/my-account"
											type="button"
											className="toggle-only-display toggle-only-display--ui-fix btn navbar-btn margin-right btn-green hvr-icon-forward navigation-only-display--ui-fix"
										>
											<T>common.header.myaccount</T>
										</Link>
									</When>
									<When default>
										<Link
											to="/login"
											type="button"
											className="toggle-only-display toggle-only-display--ui-fix btn navbar-btn margin-right btn-green hvr-icon-forward"
										>
											<span>
												<T>
													common.header.signup_or_login
												</T>
											</span>
										</Link>
									</When>
								</Case>
							</li>
							<li>
								<Link to="/companies" className="link-kumya ">
									<span>
										<T>common.header.companies</T>
									</span>
								</Link>
							</li>
							<li>
								<Link to="/jobs" className="link-kumya">
									<span>
										<T>common.header.jobs</T>
									</span>
								</Link>
							</li>
							<li>
								<Link
									to="/worker-resources"
									className="link-kumya"
								>
									<span>
										<T>common.header.resources</T>
									</span>
								</Link>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right navbar-right--ui-fix">
							<Case>
								<When cond={this.props.isLoggedIn}>
									<li className="navigation-only-display dropdown pf  show-on-hover-pf navigation-only-display--ui-fix">
										<Link
											to="#"
											className="dropdown-toggle  "
											data-toggle="dropdown"
										>
											<img
												src="images/profileIcon.png"
												className="img-responsive  dp-profile"
												alt="Profile Icon"
											/>{" "}
										</Link>
										<ul className="dropdown-menu pf">
											<li className="tr">
												<Link
													to="/my-account"
													className="navbar-link margin-right"
												>
													<T>
														common.header.myaccount
													</T>
												</Link>
											</li>
											<li className="tr">
												<LogoutButton className="navbar-link margin-right">
													<T>common.header.logout</T>
												</LogoutButton>
											</li>
										</ul>
									</li>
								</When>
								<When default>
									<li>
										<Link
											to="/register"
											type="button"
											id="register-button"
											className="btn navbar-btn margin-right btn-green hvr-icon-forward"
										>
											<T>common.header.signup</T>
										</Link>
									</li>
									<li>
										<Link
											to="/login"
											className="navbar-link margin-right"
										>
											<T>common.header.login</T>
										</Link>
									</li>
								</When>
							</Case>

							<li className="dropdown">
								<LangSelector />
							</li>
							<li>
								<Link to="/foremployers" className="link-kumya">
									<span>
										<T>common.header.for_employers</T>
									</span>
								</Link>
							</li>
							<br />
							<When cond={this.props.isLoggedIn}>
								<li>
									<LogoutButton className="toggle-only-display toggle-only-display--ui-fix navbar-link margin-right">
										<T>common.header.logout</T>
									</LogoutButton>
								</li>
							</When>
						</ul>
						<div className="clearfix" />
					</div>
				</nav>
			</div>
		);
	}
}

export default withTracker(() => ({
	isLoggedIn: Meteor.userId() !== null,
}))(WorkerHeader);
