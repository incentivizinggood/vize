import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { translations } from "imports/ui/translations";

import WorkerNavLinks from "./worker-nav-links";
import EmployerNavLinks from "./employer-nav-links";
import FadableNav from "./fadable-nav";
import LangSelector from "./lang-selector";
import LogoutButton from "./logout-button";

const T = translations.header;

function NavLinks({ user }) {
	// The user is an employer.
	if (user && user.role === "company") {
		return <EmployerNavLinks user={user} />;
	}

	// The user is a worker or is not logged in.
	return <WorkerNavLinks />;
}

function AccountLink({ user }) {
	if (user) {
		return (
			<Link
				to="/my-account"
				type="button"
				className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward navigation-only-display--ui-fix"
			>
				<T.myaccount />
			</Link>
		);
	}

	return (
		<Link
			to="/login"
			type="button"
			className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
		>
			<span>
				<T.signup_or_login />
			</span>
		</Link>
	);
}

function AccountSection({ user }) {
	if (user) {
		return (
			<li className="navigation-only-display dropdown pf show-on-hover-pf">
				<div className="dropdown-toggle" data-toggle="dropdown">
					<img
						src="/images/profileIcon.png"
						className="img-responsive dp-profile"
						alt="Profile Icon"
					/>{" "}
				</div>
				<ul className="dropdown-menu pf">
					<li className="tr">
						<Link
							to="/my-account"
							className="navbar-link margin-right"
						>
							<T.myaccount />
						</Link>
					</li>
					<li className="tr">
						<LogoutButton className="navbar-link margin-right">
							<T.logout />
						</LogoutButton>
					</li>
				</ul>
			</li>
		);
	}

	return (
		<>
			<li>
				<Link
					to="/register"
					type="button"
					id="register-button"
					className="btn navbar-btn margin-right btn-green hvr-icon-forward"
				>
					<T.signup />
				</Link>
			</li>
			<li>
				<Link to="/login" className="navbar-link margin-right">
					<T.login />
				</Link>
			</li>
		</>
	);
}

function Header(props) {
	return (
		<div className="top-nav">
			<FadableNav animated={props.navIsAnimated}>
				<div className="naviagtion-container">
					<div className="navbar-header logo">
						<button
							type="button"
							className="navbar-toggle collapsed slide-toggle"
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
								<img src="/images/logo.png" alt="Vize Logo" />
							</Link>
						</h2>
					</div>
					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav left_nav">
							<li>
								<AccountLink user={props.user} />
							</li>
							<NavLinks user={props.user} />
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<AccountSection user={props.user} />

							<li className="dropdown">
								<LangSelector />
							</li>
							<li>
								<Link
									to="/for-employers"
									className="link-kumya"
								>
									<span>
										<T.for_employers />
									</span>
								</Link>
							</li>
							<br />
							{props.user ? (
								<li>
									<LogoutButton className="toggle-only-display navbar-link margin-right">
										<T.logout />
									</LogoutButton>
								</li>
							) : null}
						</ul>
						<div className="clearfix" />
					</div>
				</div>
			</FadableNav>
		</div>
	);
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(Header);
