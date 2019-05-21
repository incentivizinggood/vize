import React from "react";
import styled from "styled-components";

import PageWrapper from "/imports/ui/components/page-wrapper";
import Button from "/imports/ui/components/button";

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
		</PageWrapper>
	);
}

export default FormDemo;
