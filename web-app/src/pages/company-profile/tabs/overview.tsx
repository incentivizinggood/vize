import React from "react";

import Spinner from "src/components/Spinner";
import { useCompanyProfileOverviewTabQuery } from "generated/graphql-operations";
import { translations } from "src/translations";

import {
	OverviewSection,
	ReviewsSection,
	JobsSection,
	SalariesSection,
} from "../sections";

const T = translations.legacyTranslationsNeedsRefactor;

interface OverviewTabProps {
	companyId: string;
}

export default function OverviewTab({
	companyId,
}: OverviewTabProps): JSX.Element {
	const { loading, error, data } = useCompanyProfileOverviewTabQuery({
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

	return (
		<>
			<OverviewSection company={data.company} />
			<div className="clear" />
			<ReviewsSection company={data.company} />
			<JobsSection
				jobAds={data.company.jobAds}
				numJobAds={data.company.numJobAds}
			/>

			<SalariesSection company={data.company} />
		</>
	);
}
