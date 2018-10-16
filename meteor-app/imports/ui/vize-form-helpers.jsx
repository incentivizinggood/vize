import React from "react";
import { VfInputText, VfInputTextWithOptionList } from "/imports/ui/components/vize-formik-components.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();
const T = i18n.createComponent(t);

const companyNameForIdQuery = gql`
	query companyNameForId($companyId: ID!) {
		company(id: $companyId) {
			name
		}
	}
`;

const allCompanyNamesQuery = gql`
	query getAllCompanyNames {
		allCompanies {
			name
		}
	}
`;

export const renderReadOnlyCompanyNameField = (props) => (
	<Query query={companyNameForIdQuery} variables={{companyId: props.companyId}}>
		{({ loading, error, data }) => {
			const companyName = () => {
				if (loading) {
					return t("common.forms.pleaseWait");
				}
				else if (error || data.company === undefined || data.company === null) {
					console.log(error);
					return t("common.forms.companyNotFound");
				}
				return data.company.name;
			}

			return (
				<VfInputText
					name="companyName"
					labelgroupname={props.labelgroupname}
					value={companyName()}
					readOnly="true"
				/>
			);
		}}
	</Query>
);

export const renderEmptyCompanyNameField = (props) => (
	<Query query={allCompanyNamesQuery} variables={{  }}>
		{({ loading, error, data }) => {
			const listOfCompanyNames = () => {
				if (loading) {
					return [t("common.forms.pleaseWait")];
				}
				else if (error || data.allCompanies === undefined || data.allCompanies === null || data.allCompanies.length === 0) {
					return [];
				}
				return data.allCompanies.map(result => result.name);
			}

			return (
				<VfInputTextWithOptionList
					name="companyName"
					labelgroupname={props.labelgroupname}
					maxLength="100"
					optionlist={listOfCompanyNames()}
					placeholder={t(`common.forms.${props.placeholdergroupname}.companyNamePlaceholder`)}
				/>
			);
		}}
	</Query>
);
