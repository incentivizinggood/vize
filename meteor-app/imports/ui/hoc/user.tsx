import React from "react";

import { CurrentUserComponent as QueryCurrentUser } from "imports/gen/graphql-operations";

export function withUser(WrappedComponent) {
	// TODO: Fix caching on login and logout so
	// that we do not need fetchPolicy="network-only"
	return props => (
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
