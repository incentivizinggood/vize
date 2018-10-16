import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const userPageQuery = gql`
	query userPage($userId: ID!) {
		user(id: $userId) {
			username
			role
		}
	}
`;

/* Users can view the public information of other users on this page.
 */
export default function UserPage(props) {
	return (
		<div className="page user">
			<Query query={userPageQuery} variables={{ userId: props.user_id }}>
				{({ loading, error, data }) => {
					if (loading) {
						return <h2>Loading...</h2>;
					}
					if (error) {
						return <h2>{`Error! ${error.message}`}</h2>;
					}

					return (
						<>
							<h2>Name: {data.user.username}</h2>
							<h2>Role: {data.user.role}</h2>
						</>
					);
				}}
			</Query>
		</div>
	);
}

UserPage.propTypes = {
	user_id: PropTypes.string.isRequired,
};
