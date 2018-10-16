import React from "react";
import { VfInputText, VfInputTextWithOptionList } from "/imports/ui/components/vize-formik-components.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();

const getCompanyNameForId = (companyId) => {
	return "";
};

const getAllCompanyNames = () => {
	return ["Loading..."];
};

export const renderReadOnlyCompanyNameField = (props) => {
	return (
		<VfInputText
			name="companyName"
			labelgroupname={props.labelgroupname}
			value={getCompanyNameForId(props.companyId)}
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
			placeholder={t(`common.forms.${props.placeholdergroupname}.companyNamePlaceholder`)}
		/>
	);
};
