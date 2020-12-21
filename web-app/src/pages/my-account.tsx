import React from "react";
import { Link } from "react-router-dom";

import { withUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";

import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";

const T = translations.myAccount;
const TLoggedIn = translations.needToBeLoggedInToView;

/* The page where users can view their account details,
 * update their profiles, and change settings.
 */
class MyAccountPage extends React.Component {
	renderContent() {
		return (
			<div style={{ width: "80%", margin: "0 auto" }}>
				<br />
				<h2>
					<strong><T.myAccount /></strong>
				</h2>
				<hr />
				<div>
					<strong><T.username />: </strong>
					{this.props.user.username}
					<br />
					<br />
					<Link className="btn btn-info" to={`/${urlGenerators.queryRoutes.changePassword}`}>
						<T.changePassword />
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
					<TLoggedIn.youNeedToBeLoggedInToView /> <br /> <br />
					<Link
						className="btn btn-primary"
						to={urlGenerators.vizeLogin("worker")}
					>
						<TLoggedIn.login />
					</Link>

					<br />
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
