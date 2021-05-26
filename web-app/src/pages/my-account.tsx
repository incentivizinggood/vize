import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "src/hoc/user";

import { withUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";

import LinkButton from "src/components/button/link-button";

import Spinner from "src/components/Spinner";
import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";
import { useGetUserProfileDataQuery } from "generated/graphql-operations";

const T = translations.myAccount;
const TLoggedIn = translations.needToBeLoggedInToView;

/* The page where users can view their account details,
 * update their profiles, and change settings.
 */
export default function MyAccountPage() {
	const user = useUser();

	let { data: userProfileData, loading, error } = useGetUserProfileDataQuery({
		variables: { userId: user ? user.id : "0" },
	});

	if (loading) return <Spinner />;

	console.log('userProfile', userProfileData);
	console.log('userProfileload', loading);
	console.log('userProfileerror', error);
	let userProfileButtonText = (<T.createProfile />);

	// If user has a user profile, fill in the form fields with the user profile data
	if(userProfileData?.userProfile) {
		userProfileButtonText = (<T.editProfile />);
	}

	
		let content = null;
		if (user) {
			console.log('user', user);
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
				<br />
				<h2>
					<strong><T.myAccount /></strong>
				</h2>
				<hr />
				<div>
					<LinkButton to={`/${urlGenerators.queryRoutes.userProfileForm}`} $primary>
						{userProfileButtonText}
					</LinkButton>
					<br />
					<br />
					<LinkButton to={`/${urlGenerators.queryRoutes.changePassword}`} $primary>
						<T.changePassword />
					</LinkButton>
					<br />
					<br />
				</div>
			</div>
			);
		} else {
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
					<br />
					<TLoggedIn.youNeedToBeLoggedInToView /> <br /> <br />
					<LinkButton
						to={urlGenerators.vizeLogin("worker")}
						$primary
					>
						<TLoggedIn.login />
					</LinkButton>

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
