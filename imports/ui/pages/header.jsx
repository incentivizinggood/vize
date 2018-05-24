import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { If, Then, Else } from "../if-else.jsx";
import LangSelector from "../components/lang-selector.jsx";

/* The "header" page. */
class Header extends React.Component {
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
									<a
										href=""
										type="button"
										id="register-button-menu"
										className=" btn navbar-btn margin-right btn-green hvr-icon-forward"
									>
										Sign Up or Login
									</a>
								</li>
								<hr className="hr_line_width1" />
								<li>
									<a
										href="/companies"
										className="link-kumya "
									>
										<span>Companies</span>
									</a>
								</li>
								<li>
									<a href="/jobs" className="link-kumya">
										<span>Jobs</span>
									</a>
								</li>
								<li>
									<a href="" className="link-kumya">
										<span>Resources</span>
									</a>
								</li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<If cond={this.props.isLoggedIn}>
									<Then>
										<li>
											<a
												href="/my-account"
												type="button"
												id="register-button"
												className="btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												My Account
											</a>
										</li>
										<li>
											<a
												onClick={Meteor.logout}
												className="navbar-link margin-right"
											>
												LOG OUT
											</a>
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
												Sign Up
											</a>
										</li>
										<li>
											<a
												href="/login"
												className="navbar-link margin-right"
											>
												LOG IN
											</a>
										</li>
									</Else>
								</If>

								<li className="dropdown">
									<hr className="hr_line_width2" />
									<LangSelector />
								</li>
								<li>
									<a
										href="/foremployers"
										className="link-kumya"
									>
										<span>For Employers</span>
									</a>
								</li>
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
}))(Header);
