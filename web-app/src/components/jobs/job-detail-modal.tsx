import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { borderRadius } from "src/global-styles";
import {
	JobPostTitleRow,
	JobContentWrapper,
} from "src/components/jobs/new-job-post";
import HorizontalLine from "../horizontal-line";
import CompanyContentWrapper from "./company-content-wrapper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { forSize } from "src/responsive";

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
		margin-top: 0px;
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
interface JobDetailModalProps {
	visible: boolean;
	jobPost: any;
	showApplyToJobModal: () => void;
	onClose: () => void;
}

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
	const { visible, jobPost, showApplyToJobModal, onClose } = props;
	const [activetTab, setActiveTab] = useState(1);
	const jobContentRef = useRef(null);
	const companyContentRef = useRef(null);
	const scrollableContentRef = useRef(null);

	console.log("dataa", jobPost);

	const onScroll = (e) => {
		if (
			e.currentTarget.scrollTop <
			companyContentRef.current.offsetTop -
				scrollableContentRef.current.offsetTop
		) {
			setActiveTab(1);
		} else {
			setActiveTab(2);
		}
	};
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
					showApplyToJobModal={showApplyToJobModal}
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
				>
					<Tab value={1} label="Empleo" />
					<Tab value={2} label="Empresa" />
				</Tabs>
				<ScrollableContent
					onScroll={onScroll}
					ref={scrollableContentRef}
				>
					<div
						ref={jobContentRef}
						id="job-content"
						onScroll={onScroll}
					>
						<JobContentWrapper {...jobPost}></JobContentWrapper>
					</div>
					<HorizontalLine />
					<div
						ref={companyContentRef}
						id="company-content"
						onScroll={onScroll}
					>
						<CompanyContentWrapper
							company={jobPost.company}
						></CompanyContentWrapper>
					</div>
				</ScrollableContent>
			</JobPostContent>
		</StyledModal>
	);
}
