import React from "react";
import { VfInputText, VfInputTextWithOptionList } from "/imports/ui/components/vize-formik-components.jsx";

const getCompanyNameForId = (companyId) => {
	return "";
};

const getAllCompanyNames = () => {
	return [];
};

export const renderReadOnlyCompanyNameField = (props) => {
	return (
		<VfInputText
			name="companyName"
			labelgroupname={props.labelgroupname}
			value={getCompanyNameForId(props.copmanyId)}
			readonly="true"
		/>
	);
};

export const renderEmptyCompanyNameField = (props) => {
	return (
		<VfInputTextWithOptionList
			name="companyName"
			labelgroupname={props.labelgroupname}
			optionlist={getAllCompanyNames()}
			placeholder={t("common.forms.wr.companyNamePlaceholder")}
		/>
	);
};
