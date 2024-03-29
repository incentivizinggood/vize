import React from "react";
import styled from "styled-components";

import PageWrapper, { PageWrapperProps } from "src/components/page-wrapper";
import { Panel, PanelContainer, PannelPadding } from "src/components/panel";
import { colors } from "src/global-styles";
import { forSize } from "src/responsive";

const PostFormMainHeader = styled.h2`
	text-align: left;
	margin-bottom: 10px;
`;

const PostFormSubHeader = styled.p`
	text-align: left;
	margin-bottom: 5px;
	font-weight: 0 !important;
	font-size: 14px;
	text-align: left;
	color: #808080;
`;

const FormHeader = styled.h1`
	margin-bottom: 10px;
	font-weight: bold;
	font-size: 32px;
	text-align: center;
`;

const FormText = styled.p`
	margin-bottom: 5px;
	color: black;
	font-size: 15px;
	text-align: left;
`;

const FormFooter = styled.div`
	width: calc(100% + ${PannelPadding} * 2);
	position: relative;
	left: -${PannelPadding};
	padding: ${PannelPadding} ${PannelPadding} 0 ${PannelPadding};
	margin-top: ${PannelPadding};

	border-top: 1px solid ${colors.onSurfaceWeak};

	text-align: center;
	font-size: 16px;
	font-weight: 700;
`;

const FormToolbar = styled.div`
	text-align: left;
	margin-top: 20px;
	.form-button {
		margin-left: -30px !important;
		width: calc(100% + 60px) !important;
		margin-bottom: -30px !important;
	}

	${forSize.phoneOnly} {
		text-align: center;
	}
`;

const PostFormHeaderContainer = styled.div`
	// margin-bottom: 20px;
	// padding: 30px 30px 0px 30px;
`;
const PostFormFieldContainer = styled.div`
	// padding: 30px;
`;
const ShiftSelectionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	> div {
		margin-right: 10px;
	}
	> div:last-child {
		margin-right: 0;
	}
	${forSize.phoneOnly} {
		display: grid;
		grid-template-columns: repeat(2, 45%);
		> div {
			margin-right: 0;
		}
	}
`;
type FormPageWrapperProps = PageWrapperProps;

function FormPageWrapper({ children, ...restProps }: FormPageWrapperProps) {
	return (
		<PageWrapper {...restProps}>
			<PanelContainer>
				<Panel roundedEdges>{children}</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}

export {
	FormHeader,
	FormText,
	FormFooter,
	FormToolbar,
	FormPageWrapper,
	PostFormMainHeader,
	PostFormSubHeader,
	PostFormHeaderContainer,
	PostFormFieldContainer,
	ShiftSelectionWrapper,
};
