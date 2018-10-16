import React from "react";
import { VfInputText, VfInputTextWithOptionList } from "/imports/ui/components/vize-formik-components.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();
const T = i18n.createComponent(t);

const companyNameForIdQuery = gql`
	query companyNameForId($companyId: String!) {
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
	<Query query={companyNameForIdQuery} variables={{ companyId }}>
		{({ loading, error, data }) => {
			const companyName = () => {
				if (loading) {
					return t("common.forms.pleaseWait");
				}
				// If you want to check for "no results", you would
				// do it here, in the same place as the check for errors,
				// unless you want to handle them differently. The original
				// form logic handled them the exact same way.
				else if (error) {
					return t("common.forms.companyNotFound");
				}
				return "Thanks for playing!";
			}

			console.log(data);

			return (
				<VfInputText
					name="companyName"
					labelgroupname={props.labelgroupname}
					value={companyName()}
					readonly="true"
				/>
			);

		}}
	</Query>
);

export const renderEmptyCompanyNameField = (props) => (
	<Query query={allCompanyNamesQuery} variables={{  }}>
		{({ loading, error, data }) => {
			console.log("ALL COMPANY NAMES QUERY");
			console.log(data);
			const listOfCompanyNames = () => {
				if (loading) {
					return ["Loading..."];
				}
				// If you want to check for "no results", you would
				// do it here, in the same place as the check for errors,
				// unless you want to handle them differently. The original
				// form logic handled them the exact same way.
				else if (error) {
					return ["Something bad happened! PANIC!"];
				}
				return ["Thanks for playing!"];
			}

			return (
				<VfInputTextWithOptionList
					name="companyName"
					labelgroupname={props.labelgroupname}
					optionlist={listOfCompanyNames()}
					placeholder={t(`common.forms.${props.placeholdergroupname}.companyNamePlaceholder`)}
				/>
			);
		}}
	</Query>
);
