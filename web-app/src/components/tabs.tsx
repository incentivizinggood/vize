import React from "react";
import styled from "styled-components";
import {
	NavLink,
	Route,
	Switch,
	useRouteMatch,
	Redirect,
} from "react-router-dom";

import { forSize } from "src/responsive";

const TabButton = styled(NavLink)`
	background: black;
	color: white;
	flex-grow: 1;
	font-size: x-large;
	min-height: 2em;
	text-align: center;

	&.active {
		background: #439bd5;
	}

	${forSize.phoneOnly} {
		/* Reduce font size so that the tab header can fit on screen. */
		font-size: 11pt;
	}
`;

const TabHeader = styled.div`
	display: flex;
`;

interface TabsProps {
	tabs: {
		path: string;
		label: React.ReactNode;
		content: React.ReactNode;
	}[];
}

export default function Tabs(props: TabsProps) {
	const { path, url } = useRouteMatch();

	return (
		<div>
			<TabHeader>
				{props.tabs.map(tab => (
					<TabButton key={tab.path} to={`${url}/${tab.path}`}>
						{tab.label}
					</TabButton>
				))}
			</TabHeader>

			<Switch>
				<Route exact path={`${path}`}>
					<Redirect to={`${url}/${props.tabs[0].path}`} />
				</Route>

				{props.tabs.map((tab, index) => (
					<Route key={tab.path} path={`${path}/${tab.path}`}>
						{tab.content}
					</Route>
				))}
			</Switch>
		</div>
	);
}
