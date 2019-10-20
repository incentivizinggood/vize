import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import ApplyToJobAdForm from "./apply-to-job-ad-form";

const T = translations.applyToJobAd;

interface ApplyToJobAdPageProps {
	jobAdId?: string;
}

function ApplyToJobAdPage({ jobAdId }: ApplyToJobAdPageProps) {
	return (
		<FormPageWrapper title="Apply To Job Ad">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<ApplyToJobAdForm jobAdId={jobAdId} />
		</FormPageWrapper>
	);
}

export default ApplyToJobAdPage;
