import React, { useState, useRef } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { borderRadius } from "src/global-styles";
import {
	JobPostTitleRow,
	JobContentWrapper,
} from "src/pages/for-employers/job-post";
import CompanyContentWrapper from "./company-content-wrapper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const jobDetailModalStyles = {
	overlay: {
		backgroundColor: "#000000a3",
		zIndex: 999,
	},
	content: {
		top: "20%",
		margin: "0 auto",
		minWidth: "760px",
		maxWidth: "760px",
		minHeight: "600px",
	},
};
interface JobDetailModalProps {
	visible: boolean;
	jobPost: any;
	onClose: () => void;
}
const StyledModal = styled(Modal)`
	:focus-visible {
		outline: none;
	}
	.ReactModal__Overlay {
		z-index: 999;
	}
	.PrivateTabIndicator-colorPrimary-3 {
		background-color: ${colors.primaryColorBlue} !important;
	}
	.MuiTab-wrapper {
		font-weight: 900;
		color: #000000;
	}
	.MuiTabs-root {
		border-bottom: 1px solid #efefef;
	}
`;
const JobPostContent = styled.div`
	margin-top: 40px;
	background: white;
	padding: 20px;
	border-radius: ${borderRadius.container};
	height: 100%;
`;
const ScrollableContent = styled.div`
	height: 410px;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 10px;
`;


Modal.setAppElement("#app-root");
export default function JobDetailModal(
	props: JobDetailModalProps
): JSX.Element {
	const { visible, jobPost, onClose } = props;
	const [activetTab, setActiveTab] = useState(1);
	const jobContentRef = useRef(null);
	const companyContentRef = useRef(null);
	return (
		<StyledModal
			isOpen={visible}
			onRequestClose={onClose}
			style={jobDetailModalStyles}
		>
			<JobPostContent>
				<JobPostTitleRow
					{...jobPost}
					modal
					onClose={onClose}
				></JobPostTitleRow>
				<Tabs
					value={activetTab}
					indicatorColor="primary"
					textColor="primary"
					onChange={(e, tabValue) => {
						if (tabValue === 1) {
							jobContentRef.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						} else {
							companyContentRef.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
						setActiveTab(tabValue);
					}}
					aria-label="disabled tabs example"
				>
					<Tab value={1} label="Job" />
					<Tab value={2} label="Company" />
				</Tabs>
				<ScrollableContent>
					<div ref={jobContentRef}>
						<JobContentWrapper {...jobPost}></JobContentWrapper>
					</div>
					<div ref={companyContentRef}>
						<CompanyContentWrapper companyDetail={jobPost.companyDetail} company={jobPost.company}></CompanyContentWrapper>
					</div>
				</ScrollableContent>
			</JobPostContent>
		</StyledModal>
	);
}
