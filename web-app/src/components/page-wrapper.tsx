import React from "react";
import styled from "styled-components";

import Header from "src/components/header";
import Footer from "src/components/footer";

const PageContainer = styled.div`
	overflow: hidden;

	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: ${props => props.theme.background};

	> *:nth-last-child(2) {
		flex: 1 0 auto;
	}

	> *:last-child {
		flex-shrink: 0;
	}
`;

export interface PageWrapperProps {
	title?: string;
	navIsAnimated?: boolean;
	children: React.ReactNode;
}

function PageWrapper(props: PageWrapperProps) {
	// Set the page's title.
	React.useEffect(() => {
		document.title = props.title || "Vize";
	});

	return (
		<PageContainer>
			<Header navIsAnimated={props.navIsAnimated} />
			<div>{props.children}</div>
			<Footer />
		</PageContainer>
	);
}

export default PageWrapper;
