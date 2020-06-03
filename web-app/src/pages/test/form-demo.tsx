import React from "react";
import styled from "styled-components";

import PageWrapper from "src/components/page-wrapper";
import { Button, LinkButton } from "src/components/button";

const TestGrid = styled.div`
	padding-top: 67px;
	display: grid;
	grid-template-columns: auto auto;
	grid-template-rows: 200px 200px;
	justify-items: center;
	align-items: center;
`;

function FormDemo() {
	return (
		<PageWrapper>
			<TestGrid>
				<Button>Default</Button>
				<Button primary>Primary</Button>
				<Button disabled>Disabled</Button>
				<Button disabled primary>
					Disabled Primary
				</Button>
			</TestGrid>
			<TestGrid>
				<LinkButton to="#">Default</LinkButton>
				<LinkButton to="#" primary>
					Primary
				</LinkButton>
				<LinkButton to="#" disabled>
					Disabled
				</LinkButton>
				<LinkButton to="#" disabled primary>
					Disabled Primary
				</LinkButton>
			</TestGrid>
		</PageWrapper>
	);
}

export default FormDemo;
