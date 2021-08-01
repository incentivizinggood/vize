import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import ApplyToJobAdForm from "./apply-to-job-ad-form";

const T = translations.applyToJobAd;

interface ApplyToJobAdPageProps {
	jobAdId?: string;
	modalIsOpen?: boolean;
}

function ApplyToJobAdPage({ jobAdId, modalIsOpen }: ApplyToJobAdPageProps) {
	return (
		<FormPageWrapper title="Solicitar un Empleo">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<ApplyToJobAdForm jobAdId={jobAdId} modalIsOpen={modalIsOpen} />
		</FormPageWrapper>
	);
}

export default ApplyToJobAdPage;
