import React from "react";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PopupModal from "imports/ui/components/popup-modal";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";
import { withTracker } from "meteor/react-meteor-data";
import RegisterLoginModal from "imports/ui/components/register-login-modal";

import CreateReviewForm from "./create-review-form";

const T = translations.createReview;

interface CreateReviewPageProps {
	companyName?: string;
}

function CreateReviewPage({ companyName, user }: CreateReviewPageProps) {
	let content = null;
	if (user) {
		content = null;
	} else {
		content = (
			<PopupModal isOpen={true}>
				<RegisterLoginModal />
			</PopupModal>
		);
	}
	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateReviewForm companyName={companyName} />
			{content}
		</FormPageWrapper>
	);
}
export default withRouter(
	withTracker(() => ({
		user: Meteor.user(),
	}))(CreateReviewPage)
);
