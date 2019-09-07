import React from "react";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PopupModal from "imports/ui/components/popup-modal";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import CreateSalaryForm from "./create-salary-form";
import { withTracker } from "meteor/react-meteor-data";
import RegisterLoginModal from "imports/ui/components/register-login-modal";

const T = translations.createSalary;

interface CreateSalaryPageProps {
	companyName?: string;
}

function CreateSalaryPage({ companyName, user }: CreateSalaryPageProps) {
	let content = null;
	if (user) {
		content = null;
	} else {
		content = (
			<PopupModal isOpen={true} showCloseButton={false}>
				<RegisterLoginModal />
			</PopupModal>
		);
	}
	return (
		<FormPageWrapper title="Create Salary">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateSalaryForm companyName={companyName} />
			{content}
		</FormPageWrapper>
	);
}

export default withRouter(
	withTracker(() => ({
		user: Meteor.user(),
	}))(CreateSalaryPage)
);
