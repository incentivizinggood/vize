import React from "react";
import styled from "styled-components";

import PageWrapper from "imports/ui/components/page-wrapper";
import {
	Panel,
	PanelContainer,
	PannelPadding,
} from "imports/ui/components/panel";

const FormHeader = styled.h1`
	margin-bottom: 10px;
	font-weight: bold;
	font-size: 32px;
	text-align: center;
`;

const FormText = styled.p`
	margin-bottom: 5px;
	color: black;
	font-size: 15px

	text-align: left;
`;

const FormFooter = styled.div`
	width: calc(100% + ${PannelPadding} * 2);
	position: relative;
	left: -${PannelPadding};
	padding: ${PannelPadding} ${PannelPadding} 0 ${PannelPadding};
	margin-top: ${PannelPadding};

	border-top: 1px solid ${props => props.theme.onSurfaceWeak};

	text-align: center;
	font-size: 16px;
	font-weight: 700;
`;

const FormToolbar = styled.div`
	text-align: left;
	margin-top: 20px;
`;

function FormPageWrapper({ children, ...restProps }) {
	return (
		<PageWrapper {...restProps}>
			<PanelContainer>
				<Panel>{children}</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}

export { FormHeader, FormText, FormFooter, FormToolbar, FormPageWrapper };
