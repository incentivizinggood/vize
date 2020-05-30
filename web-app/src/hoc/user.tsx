import React from "react";

import {
	CurrentUserComponent as QueryCurrentUser,
	CurrentUserQuery,
} from "generated/graphql-operations";

export function withUser<T>(
	WrappedComponent: React.ComponentType<
		T & { user: CurrentUserQuery["currentUser"] }
	>
) {
	return (props: T) => (
		<QueryCurrentUser>
			{({ error, loading, data }) => (
				<WrappedComponent
					{...props}
					user={data ? data.currentUser : null}
				/>
			)}
		</QueryCurrentUser>
	);
}
