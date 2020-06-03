import React from "react";
import { Link } from "react-router-dom";

import { withUser } from "src/hoc/user";
import { translations } from "src/translations";
import { urlGenerators } from "src/pages/url-generators";

import vizeLogo from "src/images/logo.png";
import profileIcon from "src/images/profileIcon.png";

import WorkerNavLinks from "./worker-nav-links";
import EmployerNavLinks from "./employer-nav-links";
import FadableNav from "./fadable-nav";
import LangSelector from "./lang-selector";
import LogoutButton from "./logout-button";

const T = translations.header;

function getUserRole() {
	const params = new URLSearchParams(location.search);
	if (location.pathname === "/for-employers") {
		return "company";
	} else if (
		location.pathname === "/register/" ||
		location.pathname === "/login/"
	) {
		return fixNullParams(params.get("user"));
	} else {
		return "worker";
	}
}

function fixNullParams<T>(param: T | null | undefined): T | undefined {
	if (param === null) return undefined;
	return param;
}

interface NavLinksProps {
	user?: {
		role: string;
		companyId?: string | null;
	};
}

function NavLinks({ user }: NavLinksProps) {
	// The user is an employer.
	if (user && user.role === "COMPANY") {
		return <EmployerNavLinks user={user} />;
	}

	// The user is a worker or is not logged in.
	return <WorkerNavLinks />;
}

interface AccountLinkProps {
	user?: unknown;
}

function AccountLink({ user }: AccountLinkProps) {
	if (user) {
		return (
			<Link
				to="/my-account"
				type="button"
				className="toggle-only-display"
			>
				<T.myaccount />
			</Link>
		);
	}

	const userRole = getUserRole();

	return (
		<Link
			to={urlGenerators.vizeLogin(userRole)}
			type="button"
			className="toggle-only-display"
		>
			<span>
				<T.signup_or_login />
			</span>
		</Link>
	);
}

interface AccountSectionProps {
	user?: unknown;
}

function AccountSection({ user }: AccountSectionProps) {
	if (user) {
		return (
			<li className="navigation-only-display dropdown pf show-on-hover-pf">
				<div className="dropdown-toggle" data-toggle="dropdown">
					<img
						src={profileIcon}
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

	const userRole = getUserRole();

	return (
		<>
			<li>
				<Link
					to={urlGenerators.vizeRegister(userRole)}
					type="button"
					id="register-button"
					className="btn navbar-btn margin-right btn-green hvr-icon-forward"
				>
					<T.signup />
				</Link>
			</li>
			<li>
				<Link
					to={urlGenerators.vizeLogin(userRole)}
					className="navbar-link margin-right"
				>
					<T.login />
				</Link>
			</li>
		</>
	);
}

interface HeaderProps {
	navIsAnimated?: boolean;
	user?: {
		role: string;
		companyId?: string | null;
	};
}

function Header(props: HeaderProps) {
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
								<img src={vizeLogo} alt="Vize Logo" />
							</Link>
						</h2>
					</div>
					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav left_nav">
							<NavLinks user={props.user} />
							<li>
								<AccountLink user={props.user} />
							</li>
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

export default withUser(Header);