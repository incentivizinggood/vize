import React from "react";
import PropTypes from "prop-types";

import Spinner from "src/components/Spinner";
import PageWrapper from "src/components/page-wrapper";
import { useUserPageQuery } from "generated/graphql-operations";

/* Users can view the public information of other users on this page.
 */
export default function UserPage(props) {
	const { loading, error, data } = useUserPageQuery({
		variables: { userId: props.user_id },
	});

	return (
		<PageWrapper title="User">
			{loading ? (
				<Spinner />
			) : error ? (
				<h2>{`Error! ${error.message}`}</h2>
			) : (
				<>
					<h2>Name: {data.user.username}</h2>
					<h2>Role: {data.user.role}</h2>
				</>
			)}
		</PageWrapper>
	);
}

UserPage.propTypes = {
	user_id: PropTypes.string.isRequired,
};
