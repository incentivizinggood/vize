import React from "react";
import { Link } from "react-router-dom";

import { withUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";

import { urlGenerators } from "./url-generators";

/* The page where users can view their account details,
 * update their profiles, and change settings.
 */
class MyAccountPage extends React.Component {
	renderContent() {
		return (
			<div style={{ width: "80%", margin: "0 auto" }}>
				<br />
				<h2>
					<strong>My Account</strong>
				</h2>
				<hr />
				<div>
					<strong>Username: </strong>
					{this.props.user.username}
					<br />
					<br />
					<Link className="btn btn-info" to="/change-password">
						Change Password
					</Link>
					<br />
					<br />
				</div>
			</div>
		);
	}

	render() {
		let content = null;
		if (this.props.user) {
			content = this.renderContent();
		} else {
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
					<br />
					You must be logged in to use this page. <br /> <br />
					<Link
						className="btn btn-primary"
						to={urlGenerators.vizeLogin("worker")}
					>
						Log In
					</Link>
					<br />
				</div>
			);
		}

		return (
			<PageWrapper title="Account Page">
				<div className="container form-page">
					<div className="row">
						<div
							className="back_top_hover"
							style={{ backgroundColor: "#ffffff" }}
						>
							<br />
							{content}
						</div>
					</div>
				</div>
			</PageWrapper>
		);
	}
}

export default withUser(MyAccountPage);
