import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import PageWrapper from "imports/ui/components/page-wrapper";

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
					<Link className="btn btn-primary" to="/login">
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
export default withTracker(() => ({
	user: Meteor.user(),
}))(MyAccountPage);
