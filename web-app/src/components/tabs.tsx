import React from "react";

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
			<div>
				{props.tabs.map((tab, index) => (
					<button onClick={() => setTabIndex(index)}>
						{tab.label}
					</button>
				))}
			</div>

			<div>{props.tabs[tabIndex].content}</div>
		</div>
	);
}
