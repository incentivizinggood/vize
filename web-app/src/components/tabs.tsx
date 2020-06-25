import React from "react";
import styled from "styled-components";

const TabButton = styled.button`
	background: black;
	color: white;
	flex-grow: 1;
	font-size: x-large;
	min-height: 2em;
	&[aria-selected="true"] {
		background: #439bd5;
	}
`;

const TabHeader = styled.div`
	display: flex;
`;

interface TabsProps {
	tabs: {
		label: React.ReactNode;
		content: React.ReactNode;
	}[];
}

export default function Tabs(props: TabsProps) {
	const [tabIndex, setTabIndex] = React.useState(0);

	return (
		<div>
			<TabHeader role="tablist">
				{props.tabs.map((tab, index) => (
					<TabButton
						role="tab"
						aria-selected={tabIndex === index}
						onClick={() => setTabIndex(index)}
					>
						{tab.label}
					</TabButton>
				))}
			</TabHeader>

			<div role="tabpanel">{props.tabs[tabIndex].content}</div>
		</div>
	);
}
