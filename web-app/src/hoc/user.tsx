import React from "react";

import {
	useCurrentUserQuery,
	CurrentUserQuery,
} from "generated/graphql-operations";

export type UserInfo = CurrentUserQuery["currentUser"];

export function useUser(): UserInfo {
	const { data } = useCurrentUserQuery();

	return data ? data.currentUser : null;
}

export function withUser<T>(
	WrappedComponent: React.ComponentType<T & { user: UserInfo }>
) {
	return function (props: T) {
		const user = useUser();
		return <WrappedComponent {...props} user={user} />;
	};
}
