import React from "react";
import styled from "styled-components";

import PageWrapper from "src/components/page-wrapper";
import JobPosting from "src/components/jobs/job-posting";
import { useJobAdPageQuery } from "generated/graphql-operations";
import Spinner from "src/components/Spinner";

const Center = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 67px;
	max-width: 1130px;
	padding: 10px;
`;

interface JobAdPageProps {
	jobAdId: string;
}

export function JobAdPage({ jobAdId }: JobAdPageProps): JSX.Element {
	// const { loading, data } = useJobAdPageQuery({
	// 	variables: { jobAdId },
	// });

	return (
		<PageWrapper>
			{/* {loading ? (
				<Spinner />
			) : data && data.jobAd ? (
				<Center>
					
				</Center>
			) : (
				"Could not find that job ad."
			)} */}
			hello
		</PageWrapper>
	);
}
