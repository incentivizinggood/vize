import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { borderRadius } from "src/global-styles";
import {
	JobPostTitleRow,
	JobContentWrapper,
} from "src/pages/for-employers/job-post";
import HorizontalLine from "../horizontal-line";
import CompanyContentWrapper from "./company-content-wrapper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { forSize } from "src/responsive";



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
	${forSize.tabletAndDown} {
		padding: 8px;
		margin-top:0px;
	}
`;
const ScrollableContent = styled.div`
	height: calc(100vh - 260px);
	overflow-y: auto;
	overflow-x: hidden;
	padding: 10px;
	${forSize.tabletAndDown} {
		height: calc(100vh - 225px);
	}
`;


Modal.setAppElement("#app-root");
export default function JobDetailModal(
	props: JobDetailModalProps
): JSX.Element {
	const [width, setWidth] = useState<number>(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	const { visible, jobPost, onClose } = props;
	const [activetTab, setActiveTab] = useState(1);
	const jobContentRef = useRef(null);
	const companyContentRef = useRef(null);

	const onScroll = (e) => {
		if (e.currentTarget.scrollTop < 700) {
			setActiveTab(1)
		} else {
			setActiveTab(2)
		}
	}
	const jobDetailModalStyles = {
		overlay: {
			backgroundColor: "#000000a3",
			zIndex: 999,
		},
		content: {
			top: width < 450 ? 0 : "20%",
			margin: "0 auto",
			minWidth: width < 450 ? "95%" : "1100px",
			maxWidth: width < 450 ? "95%" : "1100px",
			minHeight: width < 450 ? "100vh" : "calc(100vh - 60px)",
		},
	};
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
							});
						} else {
							companyContentRef.current.scrollIntoView({
								behavior: "smooth",
							});
						}
						setActiveTab(tabValue);
					}}
					aria-label="disabled tabs example"
				>
					<Tab value={1} label="Job" />
					<Tab value={2} label="Company" />
				</Tabs>
				<ScrollableContent onScroll={onScroll}>
					<div ref={jobContentRef} id="job-content">
						<JobContentWrapper {...jobPost}></JobContentWrapper>
					</div>
					<HorizontalLine />
					<div ref={companyContentRef} id="company-content">
						<CompanyContentWrapper companyDetail={jobPost.companyDetail} company={jobPost.company}></CompanyContentWrapper>
					</div>
				</ScrollableContent>
			</JobPostContent>
		</StyledModal>
	);
}
