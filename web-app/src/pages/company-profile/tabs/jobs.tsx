import React from "react";

import Spinner from "src/components/Spinner";
import { useCompanyProfileJobTabQuery } from "generated/graphql-operations";
import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

import JobPosting from "../articles/job-ad";

const T = translations.legacyTranslationsNeedsRefactor;

interface JobTabProps {
	companyId: string;
}

export default function JobTab({ companyId }: JobTabProps): JSX.Element {
	const { loading, error, data } = useCompanyProfileJobTabQuery({
		variables: { companyId },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	if (!data || !data.company) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	const renderedJobAds = data.company.jobAds.map(jobAd => (
		<JobPosting key={jobAd.id} jobAd={jobAd} />
	));

	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{data.company.jobsCount} <T.jobscomponent.jobs_available />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			{renderedJobAds}
		</SectionContainer>
	);
}
