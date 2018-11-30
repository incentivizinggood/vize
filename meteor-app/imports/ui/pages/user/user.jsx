import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Spinner from "../components/Spinner";
import userPageQuery from "./user.graphql";

/* Users can view the public information of other users on this page.
 */
export default function UserPage(props) {
	return (
		<div className="page user">
			<Query query={userPageQuery} variables={{ userId: props.user_id }}>
				{({ loading, error, data }) => {
					if (loading) {
						return <Spinner />;
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
